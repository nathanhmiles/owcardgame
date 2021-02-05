import React, { useContext } from 'react';

export default function MatchCounter(props) {
  const matchState = props.matchState;

  const playerNum = props.playerNum;
  return(
    <div className="matchcountercontainer">
      <div id={`player${playerNum}matchcounter`} className="matchcounter counter">
        {matchState.player2.wins}
      </div>
    </div>
  );
}