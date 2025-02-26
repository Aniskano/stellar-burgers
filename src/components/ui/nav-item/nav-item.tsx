import { FC, PropsWithChildren } from 'react';
import { useMatch, useNavigate } from 'react-router';
import { Button } from '@zlden/react-developer-burger-ui-components';

type TIconTypes = 'secondary' | 'primary' | 'error' | 'success' | 'disabled';

type TIconProps = {
  type: TIconTypes;
  className?: string;
  onClick?: () => void;
};

type NavItemProps = {
  to: string;
  title: string;
  size?: 'small' | 'medium' | 'large' | 'default';
  Icon?: FC<TIconProps>;
};

import styles from './nav-item.module.css';

export const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  to,
  title,
  size = 'default',
  Icon
}) => {
  const nav = useNavigate();
  const match = useMatch(to);

  return (
    <Button
      data-test-id={`navigate-${to.slice(1)}`}
      onClick={() => nav(to)}
      extraClass={styles.item}
      htmlType='button'
      type='secondary'
    >
      {Icon && <Icon type={match ? 'primary' : 'secondary'} />}
      <span
        className={`text text_type_main-${size} text_color_${
          match ? 'primary' : 'inactive'
        }`}
      >
        {title}
      </span>
    </Button>
  );
};
