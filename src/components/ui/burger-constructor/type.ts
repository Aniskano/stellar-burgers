import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
