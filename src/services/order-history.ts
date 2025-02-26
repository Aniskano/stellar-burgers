import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderHistoryState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  fetchOrderHistory: () => Promise<void>;
};

export const useOrderHistoryStore = create<TOrderHistoryState>()(
  devtools(
    (set) => ({
      orders: [],
      loading: false,
      error: null,
      fetchOrderHistory: async () => {
        try {
          set({ loading: true, error: null });
          const orders = await getOrdersApi();
          set({ orders });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ loading: false });
        }
      }
    }),
    { name: 'orderHistory' }
  )
);
