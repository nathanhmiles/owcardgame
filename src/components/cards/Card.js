import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import gameContext from "context/gameContext";
import CardEffects from "components/cards/CardEffects";
import HealthCounter from "./HealthCounter";

export default function Card(props) {
  // Context
  const { gameState, setGameState } = useContext(gameContext);

  // Variables
  const playerHeroId = props.playerHeroId;
  const playerNum = props.playerNum;
  const playerCardsId = `player${playerNum}cards`;
  const rowId = props.rowId;
  const rowPosition = rowId[1];
  const index = props.index;

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
    isPlayed,
    isDiscarded,
  } = gameState.playerCards[playerCardsId].cards[playerHeroId];

  function discardCard() {
    // TODO: e.g. clear counters related to card, set isDiscarded
  }

  return (
    <Draggable draggableId={playerHeroId} index={index} isDragDisabled={isPlayed}> 
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="cardcontainer">
            {playerNum === 1 ? (
              <CardEffects type="enemy" effects={enemyEffects} />
            ) : (
              <CardEffects type="ally" effects={allyEffects} />
            )}
            <div
              id={`${playerHeroId}`}
              style={health > 0 ? null : { filter: "grayscale(1)" }}
              className="card"
              onClick={() => {
                props.setCardFocus({
                  playerHeroId: playerHeroId,
                  rowId: rowId,
                });
              }}
            >
              <HealthCounter health={health} />
              <img
                src={require(`assets/heroes/${id}.png`).default}
                className="cardimg"
                alt={`${name} Card`}
              />
            </div>
            {playerNum === 1 ? (
              <CardEffects type="ally" effects={allyEffects} />
            ) : (
              <CardEffects type="enemy" effects={enemyEffects} />
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
}
