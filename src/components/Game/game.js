import { useState } from 'react';

import Board from '../Board/board';

const Game = () => {
  const [ history, setHistory ] = useState([{ squares: Array(25).fill(null), location: { x: null, y: null } }]);

  const [ stepNumber, setStepNumber ] = useState(0);

  const [ xIsNext, setXIsNext ] = useState(true);

  const [ sortingStatus, setSortingStatus ] = useState(false);

  const handleClick = (i) => {
    const currentHistory = [...history.slice(0, stepNumber + 1)];
    const current = currentHistory[currentHistory.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    const latestHistory = currentHistory.concat([
      {
        squares: squares,
        location: { x: Math.floor(i / 5), y: i % 5 },
      },
    ]);
    setHistory(latestHistory);
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  };

  const toggleSorting = () => {
    setSortingStatus(!sortingStatus);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d, e] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d] &&
        squares[a] === squares[e]
      ) {
        return {
          winner: squares[a],
          winLine: lines[i],
        };
      }
    }
    return {
      winner: undefined,
      winLine: undefined,
    };
  };

  const current = history[stepNumber];
  const { winner, winLine } = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move
      ? 'Go to move #' + move + ` (${step.location.x}, ${step.location.y})`
      : 'Go to game start';
    return (
      <li key={move}>
        <button
          className={move === stepNumber ? 'button-active' : ''}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!current.squares.includes(null)) {
    status = "It's draw";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          winLine={winLine}
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button className="toggle-button" onClick={() => toggleSorting()}>
          Toggle sorting
        </button>
        <ol>{sortingStatus ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
};

export default Game;
