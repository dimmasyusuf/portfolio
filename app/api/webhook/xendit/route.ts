import { headers } from 'next/headers';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const WEBHOOK_TOKEN = process.env.XENDIT_WEBHOOK_TOKEN;

  if (!WEBHOOK_TOKEN) {
    throw new Error(
      'Please add XENDIT_WEBHOOK_TOKEN from Xendit Dashboard to .env or .env.local'
    );
  }

  const headerPayload = headers();
  const headerWebhookId = headerPayload.get('webhook-id');
  const headerCallbackToken = headerPayload.get('X-CALLBACK-TOKEN');

  if (!headerWebhookId || !headerCallbackToken) {
    return new Response('Error occured -- no xendit headers', {
      status: 400,
    });
  }

  if (headerCallbackToken !== WEBHOOK_TOKEN) {
    return new Response('Error occured -- invalid xendit token', {
      status: 400,
    });
  }

  const payload = await req.json();
  const data = payload.data;
  const status = data.status;
  const id = data.reference_id;
  const amount = data.charge_amount;

  if (status === 'SUCCEEDED') {
    const support = await prisma.support.update({
      where: { id },
      data: {
        status,
        amount,
      },
    });

    return NextResponse.json({
      message: 'Payment succeeded',
      status: 200,
      data: support,
    });
  }

  if (status === 'FAILED') {
    return NextResponse.json({
      message: 'Payment failed',
      status: 400,
    });
  }
}
