import React, { useContext } from "react";
import HeroAbilities from 'components/cards/HeroAbilities';
import gameContext from "context/gameContext";
import HealthCounter from "./HealthCounter";

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
    shieldValue,
    effect,
    enemyEffects,
    allyEffects,
    isDiscarded,
  } = gameState.playerCards[`player${playerNum}cards`].cards[playerHeroId];
  
  function drag_start(event) {
    const style = window.getComputedStyle(event.target, null);
    console.log(style);
    const str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY) + ',' + event.target.id;
    console.log(str)
    event.dataTransfer.setData("text/plain", str);
}

  

  return (
    <div id="cardfocuscontainer" >
      <div
        id={'cardfocus'}
        className="cardfocus"
        onClick={props.unsetCardFocus}
        draggable="true" onDragStart={(e) => drag_start(e)}
      >
        <HealthCounter health={health} />
        <img
          src={require(`assets/heroes/${id}.png`).default}
          className="cardimg"
          alt={"Card Focus"}
          style={{left: '0', top: '0'}}
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
