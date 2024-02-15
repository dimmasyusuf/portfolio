const midtransClient = require('midtrans-client');
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

let apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

async function updateSupportStatus(
  orderId: string,
  paymentType: string,
  status: string,
  expiryTime: string
) {
  if (orderId) {
    await prisma.support.update({
      where: {
        orderId,
      },
      data: {
        paymentType,
        status,
        expiryTime,
      },
    });

    return NextResponse.json({
      message: 'Support updated',
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: 'Support not found',
      status: 404,
    });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const transaction = await apiClient.transaction.notification(body);

  console.log('transaction:', transaction);

  const {
    transaction_status,
    fraud_status,
    order_id,
    status_code,
    gross_amount,
    payment_type,
    signature_key,
    expiry_time,
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

  const support = await prisma.support.findUnique({
    where: {
      orderId: order_id,
    },
  });

  if (!support) {
    return NextResponse.json({
      message: 'Support not found',
      status: 404,
    });
  }

  switch (transaction_status) {
    case 'capture':
      if (fraud_status === 'challenge') {
        return updateSupportStatus(
          order_id,
          payment_type,
          'PENDING',
          expiry_time
        );
      } else if (fraud_status === 'accept') {
        return updateSupportStatus(
          order_id,
          payment_type,
          'SUCCESS',
          expiry_time
        );
      }
      break;

    case 'settlement':
      return updateSupportStatus(
        order_id,
        payment_type,
        'SUCCESS',
        expiry_time
      );

    case 'deny':
    case 'cancel':
    case 'expire':
      return updateSupportStatus(order_id, payment_type, 'FAILED', expiry_time);

    case 'pending':
      return updateSupportStatus(
        order_id,
        payment_type,
        'PENDING',
        expiry_time
      );

    default:
      return NextResponse.json({
        message: 'Transaction status not found',
        status: 404,
      });
  }
}
