import React, { useContext } from "react";
import HeroAbilities from 'components/cards/HeroAbilities';
import gameContext from "context/gameContext";
import HealthCounter from "components/cards/HealthCounter";
import ShieldCounter from 'components/cards/ShieldCounter';

export default function CardFocus(props) {
  const { gameState, dispatch } = useContext(gameContext);
  const cardFocus = props.cardFocus;
  const playerHeroId = cardFocus.playerHeroId;
  const playerNum = parseInt(playerHeroId[0]);
  const rowId = cardFocus.rowId;
  const setCardFocus = props.setCardFocus;
  const unsetCardFocus = props.unsetCardFocus;

  // Get card attributes from relevant player
  const {
    id,
    name,
    health,
    shield,
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
        <HealthCounter type="cardfocuscounter" health={health} />
        {(shield > 0) && <ShieldCounter type="cardfocuscounter" shield={shield} />}
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
          setNextCardDraw={props.setNextCardDraw}
        />
        ) :(null)}
      </div>
    </div>
  );
}
