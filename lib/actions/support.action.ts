'use server';

const midtransClient = require('midtrans-client');
import prisma from '../prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const createSupportToken = async ({
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
      finish: 'http://localhost:3000/support/status',
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

export const createSupport = async ({
  name,
  message,
  order_id,
  price,
  totalCoffee,
  token,
}: {
  name: string;
  message: string;
  order_id: string;
  price: number;
  totalCoffee: number;
  token: string;
}) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  try {
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      const support = await prisma.support.create({
        data: {
          name,
          message,
          orderId: order_id,
          price,
          totalCoffee,
          amount: price * totalCoffee,
          status: 'PENDING',
          token,
          userId: user?.id!,
        },
      });

      return support;
    } else {
      throw new Error('You must be logged in to create a support');
    }
  } catch (error) {
    console.error('Error creating support:', error);
    throw error;
  }
};

export const getCurrentSupport = async (order_id: string) => {
  try {
    const support = await prisma.support.findFirst({
      where: { orderId: order_id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return support;
  } catch (error) {
    console.error('Error getting support:', error);
    throw error;
  }
};

export async function getAllSupports() {
  try {
    const supports = await prisma.support.findMany({
      where: {
        NOT: {
          status: 'PENDING',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return supports;
  } catch (error) {
    console.error('Error getting supports:', error);
    throw error;
  }
}

export async function deleteSupport(order_id: string) {
  try {
    await prisma.support.delete({
      where: { orderId: order_id },
    });
  } catch (error) {
    console.error('Error deleting support:', error);
    throw error;
  }
}
