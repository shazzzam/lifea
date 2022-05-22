export const neighbors = [
  [0, 1],
  [0, -1],
  [1, 1],
  [1, 0],
  [1, -1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

export const resetBoard = (height: number, width: number): TBoard => {
  const board: TBoard = [];
  for (let i = 0; i < height; i++) {
    const row: boolean[] = [];
    for (let j = 0; j < width; j++) {
      row.push(Math.random() < 0.2 ? true : false);
    }
    board.push(row);
  }
  return board;
};

export const clearBoard = (height: number, width: number): TBoard => {
  const board: TBoard = [];
  for (let i = 0; i < height; i++) {
    const row: boolean[] = [];
    for (let j = 0; j < width; j++) {
      row.push(false);
    }
    board.push(row);
  }
  return board;
};

export const setPattern = (
  height: number,
  width: number,
  pattern: TPattern
): TBoard => {
  const board = clearBoard(height, width);
  pattern.forEach((point) => {
    board[point[0]][point[1]] = true;
  });
  return board;
};

export const checkNextTickAlive = (
  board: TBoard,
  x: number,
  y: number
): boolean => {
  let sum = 0;
  neighbors.forEach((neighbor) => {
    board[y + neighbor[0]] && board[y + neighbor[0]][x + neighbor[1]] && sum++;
  });
  if (board[y][x]) {
    if (sum === 2 || sum === 3) {
      return true;
    }
  } else if (sum === 3) {
    return true;
  }

  return false;
};

export const nextTickBoard = (board: TBoard): TBoard => {
  const width = board[0].length;
  const height = board.length;

  const res: TBoard = [];

  for (let y = 0; y < height; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < width; x++) {
      row.push(checkNextTickAlive(board, x, y));
    }
    res.push(row);
  }

  return res;
};
