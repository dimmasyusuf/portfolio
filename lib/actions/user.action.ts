'use server';

import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { handleError } from '../utils';

export const getUserProfile = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  try {
    if (!email) throw new Error('Email is required');

    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          messages: true,
        },
      });

      return user;
    }
  } catch (error) {
    handleError(error);
  }
};
