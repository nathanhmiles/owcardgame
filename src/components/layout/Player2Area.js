import Player2Hand from './Player2Hand';
import PowerCounter from  './PowerCounter';

export default function Player1Area() {
  const power = 0;

  return(
    <div id="player2area" className="playarea">
      <div id="player2name" className="playername">Player 2</div>
      <Player2Hand />
      <PowerCounter power={power} />
    </div>
  );
}