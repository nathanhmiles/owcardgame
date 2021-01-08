import CardRow from './CardRow.js';
import Player1Hand from './Player1Hand';

export default function Player1Area() {
  // id 1f == player 1 front row. m == middle b == back
  const rowIds = ['1b', '1m', '1f'];
  
  return(
    <div id="player1area" className="playarea">
      <Player1Hand />
      {rowIds.map((id) => { return (
        <CardRow id={id} />
      )})}
    </div>
  );
}