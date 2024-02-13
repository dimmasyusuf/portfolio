const midtransClient = require('midtrans-client');
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

let apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

async function updatePaymentStatus(
  paymentId: string,
  status: string,
  paymentType: string
) {
  if (paymentId) {
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status,
        paymentType,
      },
    });

    return NextResponse.json({
      message: 'Payment updated',
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: 'Payment not found',
      status: 404,
    });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const transaction = await apiClient.transaction.notification(body);
  const {
    transaction_status,
    fraud_status,
    order_id,
    status_code,
    gross_amount,
    payment_type,
    signature_key,
  } = transaction;
  const serverKey = process.env.MIDTRANS_SERVER_KEY as string;

  const signatureKey = crypto
    .createHash('sha512')
    .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
    .digest('hex');

  if (signatureKey !== signature_key) {
    return NextResponse.json({
      message: 'Invalid signature key',
      status: 400,
    });
  }

  const payment = await prisma.payment.findUnique({
    where: {
      orderId: order_id,
    },
  });

  if (!payment) {
    return NextResponse.json({
      message: 'Payment not found',
      status: 404,
    });
  }

  switch (transaction_status) {
    case 'capture':
      if (fraud_status === 'challenge') {
        return updatePaymentStatus(payment.id, 'PENDING', payment_type);
      } else if (fraud_status === 'accept') {
        return updatePaymentStatus(payment.id, 'SUCCESS', payment_type);
      }
      break;

    case 'settlement':
      return updatePaymentStatus(payment.id, 'SUCCESS', payment_type);

    case 'deny':
    case 'cancel':
    case 'expire':
      return updatePaymentStatus(payment.id, 'FAILED', payment_type);

    case 'pending':
      return updatePaymentStatus(payment.id, 'PENDING', payment_type);

    default:
      return NextResponse.json({
        message: 'Transaction status not found',
        status: 404,
      });
  }
}
