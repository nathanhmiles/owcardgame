import React, { useContext } from "react";
import PlayerHand from "./PlayerHand";
import PowerCounter from "./PowerCounter";
import gameContext from "context/gameContext";
import MatchCounter from "./MatchCounter";

export default function PlayerArea(props) {
  const { gameState } = useContext(gameContext);

  const playerAreaId = `player${props.playerNum}area`;
  const totalPower = props.totalPower;
  if (props.playerNum === 1) {
    return (
      <div id={playerAreaId} className="playerarea row">
      <MatchCounter playerNum={props.playerNum} matchState={props.matchState} />
        <div className="playerarea-section">
          <h1 className="playername">Player {props.playerNum}</h1>
        <PowerCounter playerNum={props.playerNum} power={totalPower} />
        </div>
        <PlayerHand
          setCardFocus={props.setCardFocus}
          playerNum={props.playerNum}
          nextCardDraw={props.nextCardDraw}
          setNextCardDraw={props.setNextCardDraw}
        />
      </div>
    );
  } else {
    return (
      <div id={playerAreaId} className="playerarea">
        <PlayerHand
          setCardFocus={props.setCardFocus}
          playerNum={props.playerNum}
          nextCardDraw={props.nextCardDraw}
          setNextCardDraw={props.setNextCardDraw}
        />
        <div className="playerarea-section">
          <h1 className="playername">Player {props.playerNum}</h1>
        <PowerCounter playerNum={props.playerNum} power={totalPower} />
        </div>
        <MatchCounter playerNum={props.playerNum} matchState={props.matchState} />
      </div>
    );
  }
}
