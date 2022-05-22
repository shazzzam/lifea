import cn from 'classnames';
import { FC } from 'react';

import { RowProps } from './Row.props';
import styles from './Row.module.css';

export const Row: FC<RowProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn(className, styles.row)} {...props}>
      {children}
    </div>
  );
};
