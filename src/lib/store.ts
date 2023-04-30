import { CardNominalProps } from '@/components/card-nominal/card-nominal';
import { CardPaymentProps } from '@/components/card-payment/card-payment';
import { create } from 'zustand';

export interface StoreState {
  selectedNominal: CardNominalProps | undefined;
  setSelectedNominal: (nominal: CardNominalProps) => void;
  selectedPayment: CardPaymentProps | undefined;
  setSelectedPayment: (payment: CardPaymentProps) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedNominal: undefined,
  setSelectedNominal: (nominal: CardNominalProps) =>
    set(() => ({ selectedNominal: nominal })),
  selectedPayment: undefined,
  setSelectedPayment: (payment) => set(() => ({ selectedPayment: payment })),
}));
