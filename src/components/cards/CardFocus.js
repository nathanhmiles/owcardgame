import React, { useContext } from "react";
import gameContext from "context/gameContext";
import HealthCounter from "./HealthCounter";
import data from 'data';

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
  
  // Applies the ability result to state
  function setAbilityResult(abilityResult) {
    
    if (abilityResult.type === 'row') {
      // Apply abilities that affect a whole row
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
      // Apply abilities that affect a specific card
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

    } else console.log(abilityResult);
    
  }

  function setRowSynergy(rowId, synergyCost) {
    setGameState(prevState => ({
      ...prevState,
      rows: {
        ...prevState.rows,
        [rowId]: {
          ...prevState.rows[rowId],
          synergy: prevState.rows[rowId].synergy - synergyCost,
        },
      },
    }));
  }

  // Hero ability functions
  async function activateAbility1(e) {
    e.stopPropagation();
    unsetCardFocus();
    
    // Call the relevant hero's ability, then set state using the result
    const abilityResult = await ability1();
    setAbilityResult(abilityResult);
  };

  async function activateAbility2(e) {
    e.stopPropagation();
    try {
      const rowSynergy = gameState.rows[rowId].synergy;
      unsetCardFocus();
      // Call the relevant hero's ability, then set state using the result, and deduct synergy
      const abilityResult = await ability2(rowSynergy);
      setAbilityResult(abilityResult);
      setRowSynergy(rowId, abilityResult.synergyCost);
    } catch (err) {
      setCardFocus(cardFocus);
      console.log(err);
    }
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