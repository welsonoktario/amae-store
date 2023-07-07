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
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'fail',
      msg: 'Unsupported method',
    });
  }

  const { qr } = req.query;

  try {
    const auth = btoa(`${process.env.XENDIT_SECRET!}:`);
    const resp = await fetch(`https://api.xendit.co/qr_codes/${qr}/payments`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${auth}`,
        'api-version': '2022-07-31',
        'Content-Type': 'application/json',
      },
    });

    const data = await resp.json();

    return res.status(201).json({
      status: 'ok',
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msg: 'Failed to create a new payment',
      data: err,
    });
  }
}
