import React, { useContext } from 'react';
import rowsContext from "context/rowsContext";
import PlayerHand from './PlayerHand';
import PowerCounter from  './PowerCounter';

export default function PlayerArea(props) {
  const { rowsState } = useContext(rowsContext);

  const playerNum = props.playerNum;

  return (
    <div className="playerarea">
      <div className="playername playerarea-section">Player {playerNum}</div> 
      <PlayerHand setCardFocus={props.setCardFocus} playerNum={playerNum}/>
      <PowerCounter playerNum={playerNum} power={props.totalPower} />
    </div>
  );
}