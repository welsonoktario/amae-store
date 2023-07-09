import { invoice, virtualAcc, eWallet, qr } from '@/lib/xendit';
import { NextApiRequest, NextApiResponse } from 'next';
import { Currency } from 'xendit-node/src/ewallet/ewallet_charge';

enum QrCodeTypes {
  Dynamic = 'DYNAMIC',
  Static = 'STATIC',
}

interface ResponseData {
  status: 'ok' | 'fail';
  data?: any;
  msg?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'fail',
      msg: 'Unsupported method',
    });
  }

  const {
    paymentType,
    code,
    name,
    externalID,
    amount,
    payerEmail,
    customer,
    item,
    userId,
    server,
  } = req.body;

  try {
    let resp;

    if (paymentType === 'va') {
      resp = await virtualAcc.createFixedVA({
        externalID,
        bankCode: code,
        name,
        expectedAmt: amount,
        suggestedAmt: amount,
      });
    } else if (paymentType === 'ewallet') {
      resp = await eWallet.createEWalletCharge({
        referenceID: externalID,
        amount,
        currency: Currency.IDR,
        checkoutMethod: 'ONE_TIME_PAYMENT',
        channelCode: code,
        channelProperties: {
          successRedirectURL: process.env.XENDIT_SUCCESS_REDIRECT_URL,
        },
      });
    } else if (paymentType === 'qr') {
      const auth = btoa(`${process.env.XENDIT_SECRET!}:`);
      const res = await fetch('https://api.xendit.co/qr_codes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${auth}`,
          'api-version': '2022-07-31',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference_id: externalID,
          type: QrCodeTypes.Dynamic,
          callbackURL: process.env.XENDIT_SUCCESS_REDIRECT_URL!,
          currency: 'IDR',
          amount,
          basket: [item],
          metadata: {
            userId,
            server,
          },
        }),
      });
      resp = await res.json();
      /* resp = await qr.createCode({
        externalID,
        type: QrCodeTypes.Dynamic,
        callbackURL: process.env.XENDIT_SUCCESS_REDIRECT_URL!,
        amount,
      }); */
    } else {
      resp = await invoice.createInvoice({
        externalID,
        amount,
        payerEmail,
        customer,
        locale: 'id',
        currency: 'IDR',
      });
    }

    return res.status(201).json({
      status: 'ok',
      data: resp,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: 'fail',
      msg: 'Failed to create a new payment',
      data: err,
    });
  }
}
