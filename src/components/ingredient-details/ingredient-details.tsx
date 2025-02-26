import { FC } from 'react';
import { useParams } from 'react-router';
import { useShallow } from 'zustand/react/shallow';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useIngredientsStore } from 'services';

export const IngredientDetails: FC = () => {
  const ingredients = useIngredientsStore(
    useShallow((state) => state.ingredients)
  );
  const { id } = useParams();
  const ingredientData = ingredients.find((value) => value._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
