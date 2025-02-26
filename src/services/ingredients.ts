import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
  fetchIngredients: () => Promise<void>;
};

export const useIngredientsStore = create<TIngredientsState>()(
  devtools(
    (set) => ({
      ingredients: [],
      loading: false,
      error: null,
      fetchIngredients: async () => {
        try {
          set({ loading: true, error: null });
          const ingredients = await getIngredientsApi();
          set({ ingredients });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ loading: false });
        }
      }
    }),
    { name: 'ingredients' }
  )
);
