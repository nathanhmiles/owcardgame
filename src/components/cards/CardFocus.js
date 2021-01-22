import React, { useContext } from "react";
import HeroAbilities from 'components/cards/HeroAbilities';
import gameContext from "context/gameContext";
import HealthCounter from "./HealthCounter";
import data from "data";

export default function CardFocus(props) {
  const { gameState, setGameState } = useContext(gameContext);
  const cardFocus = props.cardFocus;
  const playerHeroId = cardFocus.playerHeroId;
  const playerNum = playerHeroId[0];
  const rowId = cardFocus.rowId;
  const setCardFocus = props.setCardFocus;
  const unsetCardFocus = props.unsetCardFocus;

  // Get card attributes from relevant player
  const {
    id,
    name,
    health,
    power,
    synergy,
    shieldValue,
    ability1,
    ability2,
    effect,
    enemyEffects,
    allyEffects,
    isDiscarded,
  } = gameState.playerCards[`player${playerNum}cards`].cards[playerHeroId];
  

  return (
    <div id="cardfocuscontainer">
      <div
        id={`${playerHeroId}-cardfocus`}
        className="cardfocus"
        onClick={props.unsetCardFocus}
      >
        <HealthCounter health={health} />
        <img
          src={require(`assets/heroes/${id}.png`).default}
          className="cardimg"
          alt={"Card Focus"}
        />
        {health > 0 ? (
          <HeroAbilities 
          playerNum={playerNum}
          playerHeroId={playerHeroId}
          rowId={rowId}
          cardFocus={cardFocus}
          setCardFocus={setCardFocus}
          unsetCardFocus={unsetCardFocus}
        />
        ) :(null)}
      </div>
    </div>
  );
}
