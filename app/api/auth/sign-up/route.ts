import bcrypt from 'bcrypt';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({
        status: 400,
        message: 'Bad request: Email already exists',
      });
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

    return NextResponse.json({
      status: 201,
      message: 'Created: User created successfully',
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: `Internal Server Error: ${error.message}`,
    });
  }
}
