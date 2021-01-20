import React, { useContext } from "react";
import gameContext from "context/gameContext";
import HealthCounter from "./HealthCounter";
import data from 'data';

export default function CardFocus(props) {
  const { gameState, setGameState } = useContext(gameContext);
  const playerHeroId = props.heroId;
  const playerNum = playerHeroId[0];
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
  
  // Applies the ability result to state
  function setAbilityResult(abilityResult) {
    // Apply results of the ability to state
    if (abilityResult.type === 'row') {
      setGameState(prevState => ({
        ...prevState,
        rows: {
          ...prevState.rows,
          [abilityResult.rowId]: {
            ...prevState.rows[abilityResult.rowId],
            [abilityResult.rowKey]: [...prevState.rows[abilityResult.rowId][abilityResult.rowKey], abilityResult.rowValue],
          },
        },
      }));
    } else if (abilityResult.type === 'card') {
      const targetPlayer = abilityResult.playerHeroId[0];
  
      setGameState(prevState => ({
        ...prevState,
        playerCards: {
          ...prevState.playerCards,
          [`player${targetPlayer}cards`]: {
            ...prevState.playerCards[`player${targetPlayer}cards`],
            cards: {
              ...prevState.playerCards[`player${targetPlayer}cards`].cards,
              [abilityResult.playerHeroId]: {
                ...prevState.playerCards[`player${targetPlayer}cards`].cards[abilityResult.playerHeroId],
                [abilityResult.cardKey]: abilityResult.cardValue,
              },
            },
          },
        },
      }));

      console.log(gameState.playerCards);
    } else console.log(abilityResult);
  }

  // Hero ability functions
  function activateAbility1(e) {
    e.stopPropagation();
    unsetCardFocus();
    
    // Call the relevant hero's ability, and allow them to set state by passing in setAbilityResult
    ability1(setAbilityResult);
  };

  function activateAbility2(e) {
    e.stopPropagation();
    unsetCardFocus();

    // Call the relevant hero's ability, and allow them to set state by passing in setAbilityResult
    ability2(setAbilityResult);    
  };

  return(
    <div id="cardfocuscontainer">
      <div id={`${playerHeroId}-cardfocus`} className="cardfocus" onClick={props.unsetCardFocus}>
          <HealthCounter health={health} />
          <img 
            src={require(`assets/heroes/${id}.png`).default} 
            className="cardimg" 
            alt={'Card Focus'} 
          />
          <div id={`${id}-ability1`} className="ability ability1" onClick={activateAbility1}></div>
          <div id={`${id}-ability2`} className="ability ability2" onClick={activateAbility2}></div>
      </div>
    </div>
  );
}