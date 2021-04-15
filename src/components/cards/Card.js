import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import gameContext from "context/gameContext";
import turnContext from "context/turnContext";
import CardEffects from "components/cards/CardEffects";
import HealthCounter from "components/cards/HealthCounter";
import ShieldCounter from "components/cards/ShieldCounter";

export default function Card(props) {
  // Context
  const { gameState, dispatch } = useContext(gameContext);
  const { turnState, setTurnState } = useContext(turnContext);

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
    shield,
    enemyEffects,
    allyEffects,
    isPlayed,
    isDiscarded,
  } = gameState.playerCards[playerCardsId].cards[playerHeroId];

  function discardCard() {
    // TODO: e.g. clear counters related to card, set isDiscarded
  }

  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) return style;

    return {
      ...style,
      transitionDuration: '0.001s',
    };
  }

  return (
    (isDiscarded) ? (null) : (
      <Draggable
        draggableId={playerHeroId}
        index={index}
        isDragDisabled={isPlayed || turnState.playerTurn !== playerNum}
      >
        {(provided, snapshot) => (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            <div className="cardcontainer">
              {playerNum === 1 ? (
                <CardEffects type="enemy" effects={enemyEffects} setCardFocus={props.setCardFocus} />
              ) : (
                <CardEffects type="ally" effects={allyEffects} setCardFocus={props.setCardFocus} />
              )}
              <div
                id={`${playerHeroId}`}
                style={health > 0 ? null : { filter: "grayscale(1)" }}
                className="card"
                onClick={
                  turnState.playerTurn === playerNum ||
                  isPlayed
                    ? () => {
                        props.setCardFocus({
                          playerHeroId: playerHeroId,
                          rowId: rowId,
                        });
                      }
                    : null
                }
              >
                {turnState.playerTurn === playerNum ||
                isPlayed ? (
                  <HealthCounter type="cardcounter" health={health} />
                ) : null}
                {turnState.playerTurn === playerNum ||
                isPlayed
                  ? shield > 0 && <ShieldCounter type="cardcounter" shield={shield} />
                  : null}
                <img
                  src={
                    turnState.playerTurn === playerNum ||
                    isPlayed
                      ? require(`assets/heroes/${id}.png`).default
                      : require("assets/card-back.png").default
                  }
                  className="cardimg"
                  alt={`${name} Card`}
                />
              </div>
              {playerNum === 1 ? (
                <CardEffects type="ally" effects={allyEffects} setCardFocus={props.setCardFocus} />
              ) : (
                <CardEffects type="enemy" effects={enemyEffects} setCardFocus={props.setCardFocus} />
              )}
            </div>
          </li>
        )}
      </Draggable>

    )
  );
}
