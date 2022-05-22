import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface BoardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  width: number;
  board: TBoard;
  changeCell: (x: number, y: number) => void;
}
