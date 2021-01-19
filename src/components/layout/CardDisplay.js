import React, { useContext } from "react";
import Card from "components/cards/Card";
import { Droppable, Draggable } from "react-beautiful-dnd";
import rowsContext from "context/rowsContext";

export default function CardDisplay(props) {
  // Context
  const { rowsState } = useContext(rowsContext);

   // Variables
   const cards = rowsState[props.rowId].cardIds;
  
  return (
    <Droppable
      droppableId={props.droppableId}
      direction="horizontal"
    >
      {(provided) => (
        <ul
          className={props.listClass}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {cards &&
            cards.map((cardId, index) => {
              return (
                <Draggable key={cardId} draggableId={cardId} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Card setCardFocus={props.setCardFocus} playerHeroId={cardId} playerNum={props.playerNum} />
                    </li>
                  )}
                </Draggable>
              );
            })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
