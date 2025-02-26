import { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { AppHeaderUI } from '@ui';
import { useUserStore } from 'services';

export const AppHeader: FC = () => {
  const user = useUserStore(useShallow((state) => state.user));

  return <AppHeaderUI userName={user ? user.name : ''} />;
};
