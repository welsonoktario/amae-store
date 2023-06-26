import Xendit from 'xendit-node';

const { Invoice } = new Xendit({
  secretKey: process.env.XENDIT_SECRET!,
});

export const i = new Invoice({});
