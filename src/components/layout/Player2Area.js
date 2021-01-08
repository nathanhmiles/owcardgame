import CardRow from './CardRow';
import Player2Hand from './Player2Hand';

export default function Player2Area() {
  // id 2f == player 2 front row. m == middle b == back
  const rowIds = ['2f', '2m', '2b'];
  
  return (
    <div id="player2area" className="playarea">
      {rowIds.map((id) => { return (
        <CardRow id={id} />
      )})}
      <Player2Hand />
    </div>
  );
}