'use server';

import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/options';
import { handleError } from '../utils';

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
    } else {
      throw new Error('You must be logged in to create a message');
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

export const getMessageById = async (id: string) => {
  try {
    if (!id) throw new Error('Id is required');

    const message = await prisma.message.findUnique({
      where: { id },
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
  } catch (error) {
    handleError(error);
  }
};

export const updateMessage = async ({
  id,
  text,
}: {
  id: string;
  text: string;
}) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  try {
    if (!id || !text) {
      throw new Error('Id and text are required');
    }

    if (email) {
      const author = await prisma.user.findUnique({
        where: { email },
      });

      const message = await prisma.message.findUnique({
        where: { id },
      });

      if (author?.id === message?.authorId) {
        const updatedMessage = await prisma.message.update({
          where: { id },
          data: {
            text,
            createdAt: new Date(),
            updatedAt: new Date(),
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

        return updatedMessage;
      } else {
        throw new Error('You do not have permission to update this message');
      }
    }
  } catch (error) {
    handleError(error);
  }
};

export const deleteMessage = async (id: string) => {
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
      }
    } else {
      throw new Error('You must be logged in to delete a message');
    }
  } catch (error) {
    handleError(error);
  }
};
