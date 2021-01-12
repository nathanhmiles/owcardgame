import CardRow from './CardRow';
import data from 'data';

export default function PlayerBoard(props) {
  
  // id 1f == player 1 front row. m == middle b == back
  let rows = [{label: 'Front Row', id: `${props.playerNum}f`}, {label: 'Middle Row', id: `${props.playerNum}m`}, {label: 'Back Row', id: `${props.playerNum}b`}];
  
  if (props.playerNum === 2) {
    rows = rows.reverse();
  }

  return (
    <div id="playerboard" className="board">
      {rows.map((row) => { return (
        <CardRow label={row.label} id={row.id} key={row.id} />
      )})}
    </div>
  );
}