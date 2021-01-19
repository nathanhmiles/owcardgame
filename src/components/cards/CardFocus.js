import React, { useContext } from "react";
import gameContext from "context/gameContext";
import HealthCounter from "./HealthCounter";
import data from 'data';

export default function CardFocus(props) {
  const { gameState, setGameState } = useContext(gameContext);
  const playerHeroId = props.heroId;
  const playerNum = playerHeroId[0];

  // Get card attributes from relevant player
  const { 
    id, 
    name, 
    health, 
    ability1, 
    ability2, 
    shieldValue 
  } = gameState.playerCards[`player${playerNum}cards`].cards[playerHeroId];
  
  // Hero ability functions
  // Gets the values for the new state from the ability function, then sets the state
  function activateAbility1(e) {
    e.stopPropagation();
    console.log('ability1 clicked');
    // Get ability information from playercards data
    const abilityResult = ability1();
    
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
    }
  }

  function activateAbility2(e) {
    e.stopPropagation();
    console.log('ability2 clicked');
    ability2();
    data.heroes.widowmaker.ability2();
  }

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