import React, { useContext } from "react";
import playerCardsContext from "context/playerCardsContext";
import HealthCounter from "./HealthCounter";

export default function Card(props) {
  const { playerCards } = useContext(playerCardsContext);

  const playerHeroId = props.playerHeroId;
  const playerNum = props.playerNum;

  // Get card attributes from relevant player
  const { id, name, health, shieldValue } = playerCards[
    `player${playerNum}cards`
  ].cards[playerHeroId];

  return (
    <div id={`${id}-card`} className="card" onClick={() => {props.setCardFocus(playerHeroId)}}>
      <HealthCounter health={health} />
      <img
        src={require(`assets/heroes/${id}.png`).default}
        className="cardimg"
        alt={`${name} Card`}
      />
    </div>
  );
}
