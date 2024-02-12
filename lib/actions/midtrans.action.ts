'use server';

const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const createPaymentToken = async ({
  order_id,
  gross_amount,
  id,
  quantity,
  first_name,
  last_name,
  email,
}: {
  order_id: string;
  gross_amount: number;
  id: string;
  quantity: number;
  first_name: string;
  last_name: string;
  email: string;
}) => {
  const parameter = {
    transaction_details: {
      order_id,
      gross_amount,
    },
    item_details: [
      {
        id,
        price: 5000,
        quantity,
        name: 'Coffee',
        category: 'Support',
        merchant_name: 'dimmasyusuf',
        url: 'https://dimmasyusuf.me/support',
      },
    ],
    customer_details: {
      first_name,
      last_name,
      email,
    },
    callbacks: {
      finish: 'https://dimmasyusuf.me/support?step=4',
    },
  };

  try {
    const token = await snap.createTransactionToken(parameter);

    return token;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};
