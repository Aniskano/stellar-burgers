import { FC } from 'react';
import { Outlet } from 'react-router';

import { ProfileNav } from '@ui';
import styles from './profile.module.css';

export const Profile: FC = () => (
  <div className={styles.container}>
    <ProfileNav />
    <Outlet />
  </div>
);
