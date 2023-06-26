import { i } from '@/lib/xendit';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  status: 'ok' | 'fail';
  data?: any;
  msg?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === 'POST') {
    const { externalID, amount } = req.body;

    try {
      const resp = await i.createInvoice({
        externalID,
        amount,
      });

      return res.status(201).json({
        status: 'ok',
        data: resp,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: 'fail',
        msg: 'Failed to create a new invoice',
        data: err,
      });
    }
  } else {
    return res.status(405).json({
      status: 'fail',
      msg: 'Unsupported method',
    });
  }
}
