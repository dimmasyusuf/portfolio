'use server';

const midtransClient = require('midtrans-client');
import { getServerSession } from 'next-auth';
import prisma from '../prismadb';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const createPaymentToken = async ({
  order_id,
  gross_amount,
  id,
  quantity,
  first_name,
  last_name,
  email,
}: {
  order_id: string;
  gross_amount: number;
  id: string;
  quantity: number;
  first_name: string;
  last_name: string;
  email: string;
}) => {
  const parameter = {
    transaction_details: {
      order_id,
      gross_amount,
    },
    item_details: [
      {
        id,
        price: 5000,
        quantity,
        name: 'Coffee',
        category: 'Support',
        merchant_name: 'dimmasyusuf',
        url: 'https://dimmasyusuf.me/support',
      },
    ],
    customer_details: {
      first_name,
      last_name,
      email,
    },
    callbacks: {
      finish: 'http://localhost:3000/support?step=4',
    },
  };

  try {
    const token = await snap.createTransactionToken(parameter);

    return token;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const createPayment = async ({
  order_id,
  gross_amount,
}: {
  order_id: string;
  gross_amount: number;
}) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  try {
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      const payment = await prisma.payment.create({
        data: {
          orderId: order_id,
          amount: gross_amount,
          status: 'PENDING',
          userId: user?.id!,
        },
      });

      return payment;
    } else {
      throw new Error('You must be logged in to create a payment');
    }
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

export const getCurrentPayment = async (order_id: string) => {
  try {
    const payment = await prisma.payment.findFirst({
      where: { orderId: order_id },
    });

    return payment;
  } catch (error) {
    console.error('Error getting payment:', error);
    throw error;
  }
};
