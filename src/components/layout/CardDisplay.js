import React, { useContext } from "react";
import Card from "components/cards/Card";
import { Droppable } from "react-beautiful-dnd";
import gameContext from "context/gameContext";

export default function CardDisplay(props) {
  // Context
  const { gameState } = useContext(gameContext);

  // Variables
  const { rowId, playerNum, direction } = props;
  const cards = gameState.rows[rowId].cardIds;

  return (
    <div className={`carddisplay-container`}>
      <Droppable droppableId={props.droppableId} direction={direction}>
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
    </div>
  );
}
