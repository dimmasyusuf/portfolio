import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const email = params.email;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: 'User not found',
      });
    }

    return NextResponse.json({
      status: 200,
      message: 'User found',
      user,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: `Internal Server Error: ${error.message}`,
    });
  }
}
