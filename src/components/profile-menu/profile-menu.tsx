import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useShallow } from 'zustand/react/shallow';
import { ProfileMenuUI } from '@ui';
import { useUserStore } from 'services';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const logoutUser = useUserStore(useShallow((state) => state.logout));
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
