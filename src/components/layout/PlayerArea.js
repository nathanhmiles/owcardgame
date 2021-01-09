import PlayerHand from './PlayerHand';
import PowerCounter from  './PowerCounter';

export default function PlayerArea(props) {
  // TODO: player power should be in context
  const power = 0;

  return (
    <div className="playerarea">
      <div className="playername">Player {props.playerNum}</div> 
      <PlayerHand playerNum={props.playerNum}/>
      <PowerCounter power={power} />
    </div>
  );
}