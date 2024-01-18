'use server';

import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { handleError } from '../utils';
import bcrypt from 'bcrypt';

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });

    return user;
  } catch (error) {
    handleError(error);
  }
};

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
