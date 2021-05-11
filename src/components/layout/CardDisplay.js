import React, { useContext, useState } from "react";
import Card from "components/cards/Card";
import { Droppable } from "react-beautiful-dnd";
import gameContext from "context/gameContext";
import $ from "jquery";
import { heightIsOverflown } from "helper";

export default function CardDisplay(props) {
  // Context & State
  const { gameState } = useContext(gameContext);

  // If a direction prop is passed in, use that for the direction.
  // Otherwise, dynamically alter direction based on window width
  const [rowDirection, setRowDirection] = useState(
    props.direction
      ? props.direction
      : window.innerWidth > 1300
      ? "vertical"
      : "horizontal"
  );
  if (!props.direction) {
    window.addEventListener("resize", () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 1300) setRowDirection("vertical");
      else setRowDirection("horizontal");
    });
  }

  // Variables
  const { rowId, playerNum, listClass, droppableId } = props;
  const cards = gameState.rows[rowId].cardIds;

  return (
    <div id={`${rowId}-carddisplay`} className={`carddisplay-container`}>
      <Droppable droppableId={droppableId} direction={rowDirection}>
        {(provided, snapshot) => (
          <ul
            className={`cardlist ${listClass} ${
              snapshot.isDraggingOver ? "dragging-over" : ""
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
            id={`${rowId}-list`}
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
