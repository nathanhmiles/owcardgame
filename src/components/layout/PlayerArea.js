import PlayerHand from './PlayerHand';
import PowerCounter from  './PowerCounter';

export default function PlayerArea(props) {
  // TODO: player power should be in context
  const power = 0;

  return (
    <div className="playerarea">
      <div className="playername playerarea-section">Player {props.playerNum}</div> 
      <PlayerHand setCardFocus={props.setCardFocus} playerNum={props.playerNum}/>
      <PowerCounter power={power} />
    </div>
  );
}