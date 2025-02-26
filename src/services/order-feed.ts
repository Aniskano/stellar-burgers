import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
  fetchOrderFeed: () => Promise<void>;
};

export const useOrderFeedStore = create<TOrderFeedState>()(
  devtools(
    (set) => ({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null,
      fetchOrderFeed: async () => {
        try {
          set({ loading: true, error: null });
          const { orders, total, totalToday } = await getFeedsApi();
          set({ orders, total, totalToday });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ loading: false });
        }
      }
    }),
    { name: 'orderFeed' }
  )
);
