import React, { useContext } from "react";
import Card from "components/cards/Card";
import { Droppable } from "react-beautiful-dnd";
import gameContext from "context/gameContext";

export default function CardDisplay(props) {
  // Context
  const { gameState } = useContext(gameContext);

  // Variables
  const rowId = props.rowId;
  const cards = gameState.rows[rowId].cardIds;
  const playerNum = props.playerNum;

  return (
    <Droppable droppableId={props.droppableId} direction="vertical">
      {(provided) => (
        <ul
          className={props.listClass}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {cards &&
            cards.map((cardId, index) => {
              return (
                <Card
                  setCardFocus={props.setCardFocus}
                  playerHeroId={cardId}
                  key={cardId}
                  playerNum={playerNum}
                  rowId={props.rowId}
                  index={index}
                />
              );
            })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
