import React, { useContext } from "react";
import gameContext from "context/gameContext";
import PlayerArea from "components/layout/PlayerArea";
import PlayerBoard from "components/layout/PlayerBoard";

export default function PlayerHalf(props) {
  const { gameState } = useContext(gameContext);
  // Power state for each player
  const playerPower = gameState.rows[`player${props.playerNum}hand`].power;
  const totalPower = Object.values(playerPower).reduce((a, b) => a + b, 0);
  
  // Reverse order depending on which player (player 2 is on top of the screen, 1 on bottom)
  if (props.playerNum === 1) {
    return (
      <div>
        <PlayerBoard
          playerNum={props.playerNum}
          setCardFocus={props.setCardFocus}
        />
        <PlayerArea
          playerNum={props.playerNum}
          setCardFocus={props.setCardFocus}
          totalPower={totalPower}
          nextCardDraw={props.nextCardDraw}
          setNextCardDraw={props.setNextCardDraw}
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
          nextCardDraw={props.nextCardDraw}
          setNextCardDraw={props.setNextCardDraw}
        />
        <PlayerBoard
          playerNum={props.playerNum}
          setCardFocus={props.setCardFocus}
        />
      </div>
    );
  }
}
