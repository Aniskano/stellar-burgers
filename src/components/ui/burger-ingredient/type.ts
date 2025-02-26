import { Location } from 'react-router';
import { TIngredient } from '@utils-types';

export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: Location };
  handleAdd: () => void;
};
