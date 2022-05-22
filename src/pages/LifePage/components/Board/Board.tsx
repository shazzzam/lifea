import { FC, MouseEvent } from 'react';
import cn from 'classnames';

import { BoardProps } from './Board.props';
import styles from './Board.module.css';

export const Board: FC<BoardProps> = ({ board, changeCell, width }) => {
  const handleMouseEnter = (
    event: MouseEvent<HTMLDivElement>,
    x: number,
    y: number
  ) => {
    event.buttons && changeCell(x, y);
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const cell = event.target as HTMLDivElement;
    const x = Number(cell.getAttribute('data-x'));
    const y = Number(cell.getAttribute('data-y'));
    event.preventDefault();
    changeCell(x, y);
  };

  return (
    <div
      className={styles.board}
      style={{ width: 20 * width }}
      onMouseDown={handleMouseDown}
    >
      {board &&
        board.map((rows, y) =>
          rows.map((isAlive, x) => (
            <div
              data-x={x}
              data-y={y}
              className={cn(styles.cell, { [styles.alive]: isAlive })}
              onMouseEnter={(e) => handleMouseEnter(e, x, y)}
            />
          ))
        )}
    </div>
  );
};
