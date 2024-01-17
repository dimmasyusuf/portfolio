'use server';

import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { handleError } from '../utils';
import { revalidatePath } from 'next/cache';
import { DeleteMessageParams } from '@/types';

export const createMessage = async (text: string) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  try {
    if (!text) throw new Error('Text is required');

    if (email) {
      const author = await prisma.user.findUnique({
        where: { email },
      });

      const message = await prisma.message.create({
        data: {
          text,
          authorId: author?.id!,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      return message;
    }
  } catch (error) {
    handleError(error);
  }
};

export const getAllMessages = async () => {
  try {
    const messages = await prisma.message.findMany({
      include: {
        author: {
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

    return messages;
  } catch (error) {
    handleError(error);
  }
};

export const deleteMessage = async ({ id, path }: DeleteMessageParams) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  try {
    if (!id) throw new Error('Id is required');

    if (email) {
      const author = await prisma.user.findUnique({
        where: { email },
      });

      const message = await prisma.message.findUnique({
        where: { id },
      });

      if (author?.id === message?.authorId) {
        await prisma.message.delete({
          where: { id },
        });

        revalidatePath(path);
      }
    }
  } catch (error) {
    handleError(error);
  }
};
