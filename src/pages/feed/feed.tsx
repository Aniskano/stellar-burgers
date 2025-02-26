import { FC, useEffect, useReducer } from 'react';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useOrderFeedStore } from 'services';

export const Feed: FC = () => {
  const { orders, loading, fetchOrderFeed } = useOrderFeedStore();
  const [refreshCount, dispatch] = useReducer((value: number) => value + 1, 0);

  useEffect(() => {
    fetchOrderFeed();
  }, [fetchOrderFeed, refreshCount]);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={dispatch} />;
};
