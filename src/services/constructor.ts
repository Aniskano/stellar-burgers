import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  addIngredient: (ingredient: TIngredient) => void;
  removeIngredient: (ingredient: TConstructorIngredient) => void;
  moveUpIngredient: (index: number) => void;
  moveDownIngredient: (index: number) => void;
  clearIngredients: () => void;
};

export const useConstructorStore = create<TBurgerConstructorState>()(
  devtools(
    (set, get) => ({
      ingredients: [],
      bun: null,
      addIngredient: (ingredient: TIngredient) => {
        const id = crypto.randomUUID();
        const constructorIngredient: TConstructorIngredient = {
          ...ingredient,
          id
        };
        if (ingredient.type === 'bun') {
          set({ bun: constructorIngredient });
        } else {
          set((state) => ({
            ingredients: [...state.ingredients, constructorIngredient]
          }));
        }
      },
      removeIngredient: ({ id }: TConstructorIngredient) => {
        set((state) => ({
          ingredients: state.ingredients.filter(
            (ingredient) => ingredient.id !== id
          )
        }));
      },
      moveUpIngredient: (index: number) => {
        if (index > 0) {
          const ingredients = [...get().ingredients];
          const newIndex = index - 1;
          [ingredients[index], ingredients[newIndex]] = [
            ingredients[newIndex],
            ingredients[index]
          ];
          set({ ingredients });
        }
      },
      moveDownIngredient: (index: number) => {
        const ingredients = [...get().ingredients];
        if (index < ingredients.length - 1) {
          const newIndex = index + 1;
          [ingredients[index], ingredients[newIndex]] = [
            ingredients[newIndex],
            ingredients[index]
          ];
          set({ ingredients });
        }
      },
      clearIngredients: () => {
        set({ bun: null, ingredients: [] });
      }
    }),
    { name: 'constructor' }
  )
);
