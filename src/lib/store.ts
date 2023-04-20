import { create } from 'zustand';

export interface StoreState {
  selectedNominal: number | undefined;
  setSelectedNominal: (id: number) => void;
  selectedPayment: number | undefined;
  setSelectedPayment: (id: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedNominal: undefined,
  setSelectedNominal: (id) => set(() => ({ selectedNominal: id })),
  selectedPayment: undefined,
  setSelectedPayment: (id) => set(() => ({ selectedPayment: id })),
}));
