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
  selectedPaymentMethod?: 'va' | 'ewallet' | 'qr';
  selectedNominal?: CardNominalProps;
  selectedPayment?: CardPaymentProps;
}

export interface StoreActions {
  setAuthUser: (user: AuthUser) => void;
  setSelectedPaymentMethod: (paymentMethod?: 'va' | 'ewallet' | 'qr') => void;
  setSelectedNominal: (nominal?: CardNominalProps) => void;
  setSelectedPayment: (payment?: CardPaymentProps) => void;
  reset: () => void;
}

const initialState: StoreState = {
  selectedPaymentMethod: undefined,
  selectedNominal: undefined,
  selectedPayment: undefined,
};

export const useStore = create<StoreState & StoreActions>((set) => ({
  authUser: undefined,
  ...initialState,
  setSelectedPaymentMethod: (paymentMethod?) =>
    set(() => ({ selectedPaymentMethod: paymentMethod })),
  setAuthUser: (user?: AuthUser) => set(() => ({ authUser: user })),
  setSelectedNominal: (nominal?) => set(() => ({ selectedNominal: nominal })),
  setSelectedPayment: (payment?) => set(() => ({ selectedPayment: payment })),
  reset: () => set(initialState),
}));
