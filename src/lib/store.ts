import { CardNominalProps } from '@/components/card-nominal/card-nominal';
import { CardPaymentProps } from '@/components/card-payment/card-payment';
import { create } from 'zustand';

export interface AuthUser {
  email?: string;
  nama: string;
  hp: string;
  poin: number;
  saldo: number;
  membership: 'Publik' | 'Reseller Bronze' | 'Reseller Gold';
}

export interface StoreState {
  authUser?: AuthUser;
  setAuthUser: (user: AuthUser) => void;
  selectedPaymentMethod?: 'va' | 'ewallet' | 'qr';
  setSelectedPaymentMethod: (paymentMethod: 'va' | 'ewallet' | 'qr') => void;
  selectedNominal?: CardNominalProps;
  setSelectedNominal: (nominal: CardNominalProps) => void;
  selectedPayment?: CardPaymentProps;
  setSelectedPayment: (payment: CardPaymentProps) => void;
}

export const useStore = create<StoreState>((set) => ({
  authUser: undefined,
  paymentMethod: undefined,
  setSelectedPaymentMethod: (paymentMethod: 'va' | 'ewallet' | 'qr') =>
    set(() => ({ selectedPaymentMethod: paymentMethod })),
  setAuthUser: (user: AuthUser) => set(() => ({ authUser: user })),
  selectedNominal: undefined,
  setSelectedNominal: (nominal: CardNominalProps) =>
    set(() => ({ selectedNominal: nominal })),
  selectedPayment: undefined,
  setSelectedPayment: (payment) => set(() => ({ selectedPayment: payment })),
}));
