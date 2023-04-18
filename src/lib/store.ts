import { create } from 'zustand';

export interface StoreState {
  selectedNominal: number | undefined;
  setSelectedNominal: (id: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedNominal: undefined,
  setSelectedNominal: (id) => set(() => ({ selectedNominal: id })),
}));
