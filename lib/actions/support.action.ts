'use server';

import { getServerSession } from 'next-auth';
import prisma from '../prismadb';
import { handleError } from '../utils';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function createSupport({
  name,
  message,
  totalBurger,
  amount,
}: {
  name: string;
  message: string;
  totalBurger: number;
  amount: number;
}) {
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
          totalBurger,
          amount,
          status: 'PENDING',
          userId: user?.id!,
        },
      });

      return support;
    } else {
      throw new Error('You must be logged in to give a support');
    }
  } catch (error) {
    handleError(error);
  }
}

export async function getAllSupports() {
  try {
    const supports = await prisma.support.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return supports;
  } catch (error) {
    handleError(error);
  }
}
