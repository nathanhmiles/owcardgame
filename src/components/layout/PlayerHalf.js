import React, { useState } from "react";
import PlayerArea from "components/layout/PlayerArea";
import PlayerBoard from "components/layout/PlayerBoard";

export default function PlayerHalf(props) {
  // Power state for each player
  const [playerPower, setPlayerPower] = useState({
    f: 0,
    m: 0,
    b: 0,
  });
  const totalPower = Object.values(playerPower).reduce((a, b) => a + b, 0);
  
  // Reverse order depending on which player (player 2 is on top of the screen, 1 on bottom)
  if (props.playerNum === 1) {
    return (
      <div>
        <PlayerBoard
          playerNum={props.playerNum}
          setCardFocus={props.setCardFocus}
          playerPower={playerPower}
          setPlayerPower={setPlayerPower}
        />
        <PlayerArea
          playerNum={props.playerNum}
          setCardFocus={props.setCardFocus}
          totalPower={totalPower}
        />
      </div>
    );
  } else if (props.playerNum === 2) {
    return (
      <div>
        <PlayerArea
          playerNum={props.playerNum}
          setCardFocus={props.setCardFocus}
          totalPower={totalPower}
        />
        <PlayerBoard
          playerNum={props.playerNum}
          setCardFocus={props.setCardFocus}
          playerPower={playerPower}
          setPlayerPower={setPlayerPower}
        />
      </div>
    );
  }
}
