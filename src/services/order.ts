import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
  clear: () => void;
  makeOrder: (ingredients: string[]) => Promise<void>;
};

export const useOrderStore = create<TOrderState>()(
  devtools(
    (set) => ({
      ingredients: [],
      loading: false,
      error: null,
      clear: () => set({ order: null, error: null }),
      makeOrder: async (ingredients: string[]) => {
        try {
          set({ loading: true, error: null });
          const { order } = await orderBurgerApi(ingredients);
          set({ order });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ loading: false });
        }
      }
    }),
    { name: 'order' }
  )
);
