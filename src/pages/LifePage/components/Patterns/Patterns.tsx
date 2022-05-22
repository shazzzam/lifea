import { FC } from 'react';

import { Button, Row } from '../../../../components/ui';

import { PatternsProps } from './Patterns.props';

export const Patterns: FC<PatternsProps> = ({
  title,
  patterns,
  clickHandler,
}) => {
  return (
    <div>
      <p>{title}</p>
      <Row>
        {Object.entries(patterns).map((pattern) => (
          <Button onClick={() => clickHandler(pattern[1])} key={pattern[0]}>
            {pattern[0]}
          </Button>
        ))}
      </Row>
    </div>
  );
};
