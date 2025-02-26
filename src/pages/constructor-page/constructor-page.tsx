import { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { BurgerConstructor, BurgerIngredients } from '@components';
import { Preloader } from '@ui';
import { useIngredientsStore } from 'services';

import styles from './constructor-page.module.css';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useIngredientsStore(
    useShallow((state) => state.loading)
  );

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
