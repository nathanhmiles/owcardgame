import React from 'react';
import PlayerHand from './PlayerHand';
import PowerCounter from  './PowerCounter';

export default function PlayerArea(props) {
  const playerAreaId = `player${props.playerNum}area`
  return (
    <div id={playerAreaId} className="playerarea row">
      <div className="playername playerarea-section">Player {props.playerNum}</div> 
      <PlayerHand setCardFocus={props.setCardFocus} playerNum={props.playerNum}/>
      <PowerCounter playerNum={props.playerNum} power={props.totalPower} />
    </div>
  );
}