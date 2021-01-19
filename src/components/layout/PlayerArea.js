import React from 'react';
import PlayerHand from './PlayerHand';
import PowerCounter from  './PowerCounter';

export default function PlayerArea(props) {

  return (
    <div className="playerarea">
      <div className="playername playerarea-section">Player {props.playerNum}</div> 
      <PlayerHand setCardFocus={props.setCardFocus} playerNum={props.playerNum}/>
      <PowerCounter playerNum={props.playerNum} power={props.totalPower} />
    </div>
  );
}