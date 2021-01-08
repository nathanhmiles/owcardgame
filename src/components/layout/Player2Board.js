import CardRow from './CardRow.js';

export default function Player2Area() {
  // id 2f == player 2 front row. m == middle b == back
  const rows = [{label: 'Back Row', id:'2b'}, {label: 'Middle Row', id: '2m'},{label: 'Front Row', id: '2f'}];
  
  return(
    <div id="player2board" className="board">
      {rows.map((row) => { return (
        <CardRow label={row.label} id={row.id} key={row.id} />
      )})}
    </div>
  );
}