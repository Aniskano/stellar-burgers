import { FC, memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useConstructorStore } from 'services';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const { moveUpIngredient, moveDownIngredient, removeIngredient } =
      useConstructorStore(
        useShallow((state) => ({
          moveUpIngredient: state.moveUpIngredient,
          moveDownIngredient: state.moveDownIngredient,
          removeIngredient: state.removeIngredient
        }))
      );

    const handleMoveDown = () => {
      moveDownIngredient(index);
    };

    const handleMoveUp = () => {
      moveUpIngredient(index);
    };

    const handleClose = () => {
      removeIngredient(ingredient);
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
