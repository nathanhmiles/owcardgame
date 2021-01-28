import React, { useContext } from "react";
import PlayerHand from "./PlayerHand";
import PowerCounter from "./PowerCounter";
import gameContext from "context/gameContext";

export default function PlayerArea(props) {
  const { gameState } = useContext(gameContext);

  const playerAreaId = `player${props.playerNum}area`;
  const playerPower = gameState.rows[`player${props.playerNum}hand`].power;
  const totalPower = Object.values(playerPower).reduce((a, b) => a + b, 0);

  return (
    <div id={playerAreaId} className="playerarea row">
      <div className="playername playerarea-section">
        Player {props.playerNum}
      </div>
      <PlayerHand
        setCardFocus={props.setCardFocus}
        playerNum={props.playerNum}
        nextCardDraw={props.nextCardDraw}
        setNextCardDraw={props.setNextCardDraw}
      />
      <PowerCounter playerNum={props.playerNum} power={totalPower} />
    </div>
  );
}
