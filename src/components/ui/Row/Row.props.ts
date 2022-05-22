import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface RowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
}
