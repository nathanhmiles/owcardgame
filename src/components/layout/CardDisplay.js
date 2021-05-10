import React, { useContext, useState } from "react";
import Card from "components/cards/Card";
import { Droppable } from "react-beautiful-dnd";
import gameContext from "context/gameContext";

export default function CardDisplay(props) {
  // Context
  const { gameState } = useContext(gameContext);
  const [rowDirection, setRowDirection] = useState(
    window.innerWidth > 1300 ? "vertical" : "horizontal"
  );

  // Variables
  const { rowId, playerNum } = props;
  const cards = gameState.rows[rowId].cardIds;

  window.addEventListener("resize", () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1300) setRowDirection("vertical");
    else setRowDirection("horizontal");
  });

  return (
    <div className={`carddisplay-container`}>
      <Droppable droppableId={props.droppableId} direction={rowDirection}>
        {(provided, snapshot) => (
          <ul
            className={`${props.listClass} ${
              snapshot.isDraggingOver ? "dragging-over" : ""
            }`}
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
