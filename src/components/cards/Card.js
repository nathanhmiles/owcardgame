import React, { useContext } from "react";
import gameContext from 'context/gameContext';
import CardEffects from 'components/cards/CardEffects';
import HealthCounter from "./HealthCounter";

export default function Card(props) {
  // Context
  const { gameState } = useContext(gameContext);

  // Variables
  const playerHeroId = props.playerHeroId;
  const playerNum = props.playerNum;
  const playerCardsId = `player${playerNum}cards`;

  // Get card attributes from relevant player
  const {
    id,
    name,
    health,
    power,
    synergy,
    shieldValue,
    enemyEffects,
    allyEffects,
    isDiscarded,
  } = gameState.playerCards[playerCardsId].cards[playerHeroId];

  function discardCard() {
    // TODO: e.g. clear counters related to card, set isDiscarded
  }

  return (
    <div className="cardcontainer">
      {playerNum === 1 ? (<CardEffects type="enemy" effects={enemyEffects} />) : (<CardEffects type="ally" effects={allyEffects} />)}
      <div id={`${playerHeroId}`} style={health > 0 ? null : {filter: 'grayscale(1)'}} className="card" onClick={() => {props.setCardFocus(playerHeroId);}}>
        <HealthCounter health={health} />
        <img
          src={require(`assets/heroes/${id}.png`).default}
          className="cardimg"
          alt={`${name} Card`}
        />
      </div>
      {playerNum === 1 ? (<CardEffects type="ally" effects={allyEffects} />) : (<CardEffects type="enemy" effects={enemyEffects} />)}
    </div>
  );
}
