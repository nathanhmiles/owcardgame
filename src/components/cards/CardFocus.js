import React, { useContext } from "react";
import playerCardsContext from "context/playerCardsContext";
import HealthCounter from "./HealthCounter";
import data from 'data';

export default function CardFocus(props) {
  const { playerCards } = useContext(playerCardsContext);
  const playerHeroId = props.heroId;
  const playerNum = playerHeroId[0];

  // Get card attributes from relevant player
  const { id, name, health, shieldValue } = playerCards[
    `player${playerNum}cards`
  ].cards[playerHeroId];
  const heroAbility1 = data.heroes[id].ability1;
  const heroAbility2 = data.heroes[id].ability2;
  
  // Hero ability functions
  function activateAbility1(e) {
    e.stopPropagation();
    console.log('ability1 clicked');
    heroAbility1();
  }

  function activateAbility2(e) {
    e.stopPropagation();
    console.log('ability2 clicked');
    heroAbility2();
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