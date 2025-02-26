import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useShallow } from 'zustand/react/shallow';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useConstructorStore, useOrderStore, useUserStore } from 'services';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const user = useUserStore(useShallow((state) => state.user));
  const {
    order: orderModalData,
    loading,
    makeOrder,
    clear: clearOrder
  } = useOrderStore();
  const { ingredients, bun, clearIngredients } = useConstructorStore(
    useShallow((state) => ({
      ingredients: state.ingredients,
      bun: state.bun,
      clearIngredients: state.clearIngredients
    }))
  );

  const onOrderClick = async () => {
    if (!user) return navigate('/login');
    if (!bun || loading) return;

    const orderIngredients = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    try {
      await makeOrder(orderIngredients);
      clearIngredients();
    } catch (err) {
      console.error(
        `Failed to complete the request: ${(err as Error).message}`
      );
    }
  };

  const closeOrderModal = () => {
    clearOrder();
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={loading}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
