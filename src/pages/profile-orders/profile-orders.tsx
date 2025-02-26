import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { OrdersList } from '@components';
import { useOrderHistoryStore } from 'services';

export const ProfileOrders: FC = () => {
  const { orders, loading, fetchOrderHistory } = useOrderHistoryStore();

  useEffect(() => {
    fetchOrderHistory();
  }, [fetchOrderHistory]);

  if (loading) {
    return <Preloader />;
  }

  return <OrdersList orders={orders} />;
};
