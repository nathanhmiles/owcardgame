import React, { useContext, useEffect } from "react";
import gameContext from "context/gameContext";
import PlayerArea from "components/layout/PlayerArea";
import PlayerBoard from "components/layout/PlayerBoard";

export default function PlayerHalf(props) {
  const { gameState } = useContext(gameContext);

  // Power state for each player
  let totalPower = gameState.rows[`player${props.playerNum}hand`].totalPower();

  // Reverse order depending on which player (player 2 is on top of the screen, 1 on bottom)
  if (props.playerNum === 2) {
    return (
      <div id={`player${props.playerNum}half`} className="playerhalf">
        <PlayerArea
          playerNum={props.playerNum}
          setCardFocus={props.setCardFocus}
          totalPower={totalPower}
          nextCardDraw={props.nextCardDraw}
          setNextCardDraw={props.setNextCardDraw}
          matchState={props.matchState}
        />
        <PlayerBoard
          playerNum={props.playerNum}
          setCardFocus={props.setCardFocus}
        />
      </div>
    );
  } else {
    return (
      <div id={`player${props.playerNum}half`} className="playerhalf">
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
          matchState={props.matchState}
        />
      </div>
    );
  }
}
