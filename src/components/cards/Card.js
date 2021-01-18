import React, { useContext } from "react";
import playerCardsContext from "context/playerCardsContext";
import CardEffects from 'components/cards/CardEffects';
import HealthCounter from "./HealthCounter";

export default function Card(props) {
  const { playerCards } = useContext(playerCardsContext);

  const playerHeroId = props.playerHeroId;
  const playerNum = props.playerNum;

  // Get card attributes from relevant player
  const {
    id,
    name,
    health,
    shieldValue,
    enemyEffects,
    allyEffects,
    isDiscarded,
  } = playerCards[`player${playerNum}cards`].cards[playerHeroId];

  function discardCard() {
    // TODO: e.g. clear counters related to card, set isDiscarded
  }

  return (
    <div className="cardcontainer">
      {playerNum === 1 ? (<CardEffects type="enemy" effects={enemyEffects} />) : (<CardEffects type="ally" effects={allyEffects} />)}
      <div id={`${id}-card`} className="card" onClick={() => {props.setCardFocus(playerHeroId);}}>
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
