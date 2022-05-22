import { FC, useEffect, useState } from 'react';

import { Button, Row } from '../../components/ui';
import {
  clearBoard,
  nextTickBoard,
  resetBoard,
  setPattern,
} from '../../utils/board';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  BOARD_SPEED,
  BOARD_MIN_SPEED,
  BOARD_SPEED_STEP,
  BOARD_MAX_SPEED,
} from '../../consts/app';
import { readyPatterns } from '../../consts/patterns';

import { Board, Patterns } from './components/';

import { LifePageProps } from './LifePage.props';
import styles from './LifePage.module.css';

export const LifePage: FC<LifePageProps> = () => {
  const [pause, setPause] = useState<boolean>(true);
  const [board, setBoard] = useState<TBoard>([[]]);
  const [speed, setSpeed] = useState<number>(BOARD_SPEED);
  const [intervalID, setIntervalID] = useState<
    ReturnType<typeof setInterval> | undefined
  >(undefined);

  useEffect(() => {
    setBoard(resetBoard(BOARD_HEIGHT, BOARD_WIDTH));
  }, []);

  const changeCell = (x: number, y: number) => {
    const localBoard = [...board];
    localBoard[y][x] = !localBoard[y][x];
    setBoard(localBoard);
  };

  const nextStep = () => {
    setBoard((board) => nextTickBoard(board));
  };

  const updateInterval = (newSpeed: number) => {
    clearInterval(intervalID);
    setIntervalID(setInterval(nextStep, newSpeed));
  };

  const decSpeedHandler = () => {
    if (speed < BOARD_MIN_SPEED) {
      setSpeed((speed) => speed + BOARD_SPEED_STEP);
      intervalID && updateInterval(speed + BOARD_SPEED_STEP);
    }
  };

  const incSpeedHandler = () => {
    if (speed > BOARD_MAX_SPEED) {
      setSpeed((speed) => speed - BOARD_SPEED_STEP);
      intervalID && updateInterval(speed - BOARD_SPEED_STEP);
    }
  };

  const selectPattern = (pattern: TPattern) => {
    setBoard(setPattern(BOARD_HEIGHT, BOARD_WIDTH, pattern));
  };

  useEffect(() => {
    if (pause) {
      clearInterval(intervalID);
      setIntervalID(undefined);
    } else if (!intervalID) {
      setIntervalID(setInterval(nextStep, speed));
    }
  }, [pause, intervalID, speed]);

  return (
    <div className={styles.container}>
      <h3>Game of Life</h3>
      <Row>
        <Button
          onClick={() => setBoard(clearBoard(BOARD_HEIGHT, BOARD_WIDTH))}
          variant="danger"
        >
          Clear
        </Button>
        <Button onClick={() => setPause((pause) => !pause)} variant="primary">
          {pause ? 'Play' : 'Pause'}
        </Button>
        <Button
          onClick={() => setBoard(resetBoard(BOARD_HEIGHT, BOARD_WIDTH))}
          variant="danger"
        >
          Reset
        </Button>
      </Row>
      <Row>
        <Button
          variant="info"
          disabled={speed >= BOARD_MIN_SPEED}
          onClick={decSpeedHandler}
        >
          Decrease Speed
        </Button>
        <Button
          variant="info"
          disabled={speed <= BOARD_MAX_SPEED}
          onClick={incSpeedHandler}
        >
          Increase Speed
        </Button>
      </Row>
      <Board width={BOARD_WIDTH} board={board} changeCell={changeCell} />
      <h4>Ready to use patterns</h4>
      {Object.entries(readyPatterns).map((patternsList) => (
        <Patterns
          title={patternsList[0]}
          patterns={patternsList[1]}
          clickHandler={selectPattern}
        />
      ))}
    </div>
  );
};
