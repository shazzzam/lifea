import cn from 'classnames';
import { FC } from 'react';

import { ButtonProps } from './Button.porps';
import styles from './Button.module.css';

export const Button: FC<ButtonProps> = ({
  variant = 'default',
  children,
  ...props
}) => {
  return (
    <button className={cn(styles.btn, styles[variant])} {...props}>
      {children}
    </button>
  );
};
