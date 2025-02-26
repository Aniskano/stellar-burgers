import { FC, memo } from 'react';
import { useLocation } from 'react-router';
import { useShallow } from 'zustand/react/shallow';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useConstructorStore } from 'services';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const addIngredient = useConstructorStore(useShallow(state => state.addIngredient));

    const handleAdd = () => {
      addIngredient(ingredient);
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
