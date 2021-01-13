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

  //TODO: make cardfocused functions - context?
  return (
    <div id={`${name}-card`} className="card">
      <HealthCounter health={health} />
      <img
        src={require(`assets/heroes/${id}.png`).default}
        className="cardimg"
        alt={`${name} Card`}
      />
    </div>
  );
}
