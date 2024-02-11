'use server';

import { Xendit, PaymentRequest as PaymentRequestClient } from 'xendit-node';
import {
  EWalletChannelCode,
  PaymentMethodReusability,
  PaymentMethodType,
  PaymentRequestBasketItem,
  PaymentRequestCurrency,
} from 'xendit-node/payment_request/models';

const xenditClient = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY as string,
});

const { PaymentRequest } = xenditClient;

const xenditPaymentRequestClient = new PaymentRequestClient({
  secretKey: process.env.XENDIT_SECRET_KEY as string,
});

export async function createPaymentEWALLET({
  customerId,
  customerName,
  customerEmail,
  itemName,
  itemCategory,
  itemQuantity,
  itemPrice,
  amount,
  referenceId,
  description,
  paymentMethod,
}: {
  customerId: string;
  customerName: string;
  customerEmail: string;
  itemName: string;
  itemCategory: string;
  itemQuantity: number;
  itemPrice: number;
  amount: number;
  referenceId: string;
  description: string;
  paymentMethod: string;
}) {
  const data = {
    amount,
    currency: 'IDR' as PaymentRequestCurrency,
    referenceId,
    paymentMethod: {
      type: 'EWALLET' as PaymentMethodType,
      reusability: 'ONE_TIME_USE' as PaymentMethodReusability,
      ewallet: {
        channelCode: paymentMethod as EWalletChannelCode,
      },
    },
    items: [
      {
        name: itemName,
        category: itemCategory,
        currency: 'IDR' as PaymentRequestCurrency,
        quantity: itemQuantity,
        price: itemPrice,
      },
    ] as PaymentRequestBasketItem[],
    description,
    customerId,
    customer: {
      name: customerName,
      email: customerEmail,
    },
  };

  const response = await xenditPaymentRequestClient.createPaymentRequest({
    data,
  });

  return response;
}
