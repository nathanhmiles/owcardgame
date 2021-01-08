import CardRow from './CardRow';

export default function Player1Area() {
  // id 1f == player 1 front row. m == middle b == back
  const rows = [{label: 'Front Row', id: '1f'}, {label: 'Middle Row', id: '1m'}, {label: 'Back Row', id:'1b'}];
  
  return (
    <div id="player1board" className="board">
      {rows.map((row) => { return (
        <CardRow label={row.label} id={row.id} key={row.id} />
      )})}
    </div>
  );
}