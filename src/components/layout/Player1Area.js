import Player1Hand from './Player1Hand';
import PowerCounter from  './PowerCounter';

export default function Player1Area() {
  const power = 0;

  return (
    <div id="player1area" className="playarea">
      <div id="player1name" className="playername">Player 1</div> 
      <Player1Hand />
      <PowerCounter power={power} />
    </div>
  );
}