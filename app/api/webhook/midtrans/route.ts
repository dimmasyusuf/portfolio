import prisma from '@/lib/prismadb';
import { handleError } from '@/lib/utils';
const midtransClient = require('midtrans-client');

let apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export async function POST(req: Request) {
  try {
    const statusResponse = await apiClient.transaction.notification(req.body);
    const orderId = statusResponse.order_id;
    const status = statusResponse.transaction_status;
    const fraud = statusResponse.fraud_status;

    console.log(
      `Transaction notification received. Order ID: ${orderId}. Status: ${status}. Fraud: ${fraud}`
    );
  } catch (error) {
    handleError(error);
  }
}
