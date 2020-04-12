import InvalidArgumentError from './InvalidArgumentError';

const validateBoard = board => {
  if (!Array.isArray(board)) {
    throw new InvalidArgumentError(
      'Invalid argument passed to getNextIteration\n' +
        `\tExpected 2D array but got ${typeof board}`
    );
  }

  if (board.length === 0) {
    throw new InvalidArgumentError(
      'Invalid argument passed to getNextIteration\n' +
        '\tArray must have length of at least 1'
    );
  }

  const expectedArrayLength = board[0].length;

  board.forEach((innerArray, currentIndex) => {
    if (!Array.isArray(innerArray)) {
      throw new InvalidArgumentError(
        'Invalid argument passed to getNextIteration\n' +
          `\tExpected array of arrays but got array of ${typeof innerArray}`
      );
    }

    if (innerArray.length === 0) {
      throw new InvalidArgumentError(
        'Invalid argument passed to getNextIteration\n' +
          '\tExpected inner arrays to have length of at least 1'
      );
    }

    if (innerArray.length !== expectedArrayLength) {
      throw new InvalidArgumentError(
        'Invalid argument passed to getNextIteration\n' +
          '\tExpected inner arrays to have the same length but received ' +
          `array at index 0 with length ${expectedArrayLength} and ` +
          `index ${currentIndex} with length ${innerArray.length}`
      );
    }

    innerArray.forEach(cellElement => {
      // creating a local because of inconsistency between eslint and prettier
      const actualType = typeof cellElement;
      if (actualType !== 'boolean') {
        throw new InvalidArgumentError(
          'Invalid argument passed to getNextIteration\n' +
            `\tExpected 2D array of bools but got 2D array of ${actualType}`
        );
      }
    });
  });
};

const getNumLiveNeighbors = (board, row, col, rowLimit, colLimit) => {
  let numLiveNeighbors = 0;

  const rowMin = Math.max(0, row - 1);
  const rowMax = Math.min(row + 1, rowLimit);
  const colMin = Math.max(0, col - 1);
  const colMax = Math.min(col + 1, colLimit);

  for (let x = rowMin; x <= rowMax; x++) {
    for (let y = colMin; y <= colMax; y++) {
      if (board[x][y] && (x !== row || y !== col)) {
        numLiveNeighbors++;
      }
    }
  }

  return numLiveNeighbors;
};

const isAliveCell = cell => cell;

const getNextIteration = oldBoard => {
  validateBoard(oldBoard);

  const rowLimit = oldBoard.length - 1;
  const colLimit = oldBoard[0].length - 1;

  return oldBoard.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const numLiveNeighbors = getNumLiveNeighbors(
        oldBoard,
        rowIndex,
        colIndex,
        rowLimit,
        colLimit
      );

      return (
        (isAliveCell(cell) && [2, 3].includes(numLiveNeighbors)) ||
        (!isAliveCell(cell) && numLiveNeighbors === 3)
      );
    })
  );
};

export default getNextIteration;
