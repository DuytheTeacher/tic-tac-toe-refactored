const Square = (props) => {
  return (
    <button
      className={`square ${props.highlight ? 'highlight' : ''}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};
 export default Square;