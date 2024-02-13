'use server';

import prisma from '../prismadb';
import { getCurrentPayment } from './midtrans.action';

export async function createSupport({
  name,
  message,
  order_id,
  totalCoffee,
  amount,
}: {
  name: string;
  message: string;
  order_id: string;
  totalCoffee: number;
  amount: number;
}) {
  try {
    const payment = await getCurrentPayment(order_id);

    if (payment) {
      const support = await prisma.support.create({
        data: {
          name,
          message,
          totalCoffee,
          amount,
          paymentId: payment.id,
        },
      });

      return support;
    } else {
      throw new Error('Payment not found');
    }
  } catch (error) {
    console.error('Error creating support:', error);
    throw error;
  }
}

export async function getAllSupports() {
  try {
    const supports = await prisma.support.findMany({
      include: {
        payment: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return supports;
  } catch (error) {
    console.error('Error getting supports:', error);
    throw error;
  }
}
