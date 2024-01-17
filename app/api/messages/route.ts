import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({
        status: 400,
        message: 'Bad request: Text is required',
      });
    }

    if (email) {
      const author = await prisma.user.findUnique({
        where: { email },
      });

      const userMessage = await prisma.message.create({
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

      return NextResponse.json({
        status: 201,
        message: 'Created: Message created successfully',
        userMessage,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: `Internal Server Error: ${error.message}`,
    });
  }
}

export async function GET(req: Request) {
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

    return NextResponse.json({
      status: 200,
      message: 'OK: Messages fetched successfully',
      messages,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: `Internal Server Error: ${error.message}`,
    });
  }
}
