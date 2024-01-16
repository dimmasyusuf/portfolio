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

      const message = await prisma.message.create({
        data: {
          text,
          authorId: author?.id!,
        },
      });

      return NextResponse.json({
        status: 201,
        message: 'Created: Message created successfully',
        data: message,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: `Internal Server Error: ${error.message}`,
    });
  }
}
