import Xendit from 'xendit-node';

const { Invoice, VirtualAcc, EWallet, QrCode } = new Xendit({
  secretKey: process.env.XENDIT_SECRET!,
});

export const invoice = new Invoice({});
export const virtualAcc = new VirtualAcc({});
export const eWallet = new EWallet({});
export const qr = new QrCode({});
