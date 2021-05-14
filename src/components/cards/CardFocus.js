import React, { useContext, useRef, useEffect } from "react";
import HeroAbilities from "components/cards/HeroAbilities";
import gameContext from "context/gameContext";
import HealthCounter from "components/cards/HealthCounter";
import ShieldCounter from "components/cards/ShieldCounter";

export default function CardFocus(props) {
  const { gameState, dispatch } = useContext(gameContext);
  const cardFocus = props.cardFocus;
  const setCardFocus = props.setCardFocus;
  const unsetCardFocus = props.unsetCardFocus;
  const heroRef = useRef();

  // Remember the last card to be focused, and use that card's data so an error isnt thrown
  useEffect(() => {
    if (cardFocus !== "invisible") {
      heroRef.current = cardFocus;
    }
  });

  // If cardFocus has been set to invisible, still render the component, but exclude all visible elements
  // This is needed to ensure the 'turnstart' effects are picked up by HeroAbilities useEffect
  // TODO: using 'display: none' still renders the element, maybe that is a cleaner way to implement this
  if (cardFocus === "invisible") {
    const playerHeroId = heroRef.current.playerHeroId;
    const playerNum = parseInt(playerHeroId[0]);
    const rowId = heroRef.current.rowId;

    return (
      <div id="cardfocuscontainer">
        <div id={`cardfocus`} className="cardfocus">
          <HeroAbilities
            playerHeroId={playerHeroId}
            rowId={rowId}
            cardFocus={cardFocus}
            setCardFocus={setCardFocus}
            unsetCardFocus={unsetCardFocus}
            setNextCardDraw={props.setNextCardDraw}
            playAudio={props.playAudio}
          />
        </div>
      </div>
    );
  } else {
    const playerHeroId = cardFocus.playerHeroId;
    const playerNum = parseInt(playerHeroId[0]);
    const rowId = cardFocus.rowId;

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
          {shield > 0 && (
            <ShieldCounter type="cardfocuscounter" shield={shield} />
          )}
          <img
            src={require(`assets/heroes/cardfocus/${id}.png`).default}
            className="cardimg"
            alt={"Card Focus"}
          />
          {health > 0 ? (
            <HeroAbilities
              playerHeroId={playerHeroId}
              rowId={rowId}
              cardFocus={cardFocus}
              setCardFocus={setCardFocus}
              unsetCardFocus={unsetCardFocus}
              setNextCardDraw={props.setNextCardDraw}
              playAudio={props.playAudio}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
