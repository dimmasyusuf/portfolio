'use server';

import { Xendit, Invoice as InvoiceClient } from 'xendit-node';
import { CreateInvoiceRequest } from 'xendit-node/invoice/models';

const xenditClient = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY as string,
});

const { Invoice } = xenditClient;

const xenditInvoiceClient = new InvoiceClient({
  secretKey: process.env.XENDIT_SECRET_KEY as string,
});

export async function createInvoice({
  externalId,
  amount,
  payerEmail,
  description,
}: {
  externalId: string;
  amount: number;
  payerEmail: string;
  description: string;
}) {
  const data: CreateInvoiceRequest = {
    externalId,
    amount,
    payerEmail,
    description,
  };

  const response = await xenditInvoiceClient.createInvoice({
    data,
  });

  console.log('invoice' + response);

  return response;
}
