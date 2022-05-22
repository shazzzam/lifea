import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface TPatternsList {
  [key: string]: TPattern;
}

export interface PatternsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  patterns: TPatternsList;
  title: string;
  clickHandler: (pattern: TPattern) => void;
}
