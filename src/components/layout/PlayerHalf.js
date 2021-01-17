import React, { useState } from "react";
import PlayerArea from "components/layout/PlayerArea";
import PlayerBoard from "components/layout/PlayerBoard";

export default function PlayerHalf(props) {
  // TODO: playerpower not working - is it rerendering and so using the hardcoded values?
  const [playerPower, setPlayerPower] = useState({
    f: 0,
    m: 0,
    b: 0,
  });
  console.log(props.playerNum)
  console.log(playerPower);
  const totalPower = Object.values(playerPower).reduce((a, b) => a + b, 0);
  console.log(`playerHalf playerPower is ${Object.values(playerPower)}`);

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
