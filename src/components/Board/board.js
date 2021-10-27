import Square from '../Square/square';

const Board = (props) => {
  const { squares, winLine, onClick } = props;

  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        highlight={winLine && winLine.includes(i)}
      />
    );
  };

  const renderRows = (start) => {
    const cols = [];
    for (let i = start; i < start + 5; i++) {
      cols.push(renderSquare(i));
    }
    return (
      <div className="board-row" key={start}>
        {cols}
      </div>
    );
  };

  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(renderRows(i * 5));
  }

  return(<div>{rows}</div>);
};

export default Board;
