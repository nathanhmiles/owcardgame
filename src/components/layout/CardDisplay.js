import React, { useContext } from "react";
import Card from "components/cards/Card";
import { Droppable, Draggable } from "react-beautiful-dnd";
import gameContext from "context/gameContext";

export default function CardDisplay(props) {
  // Context
  const { gameState } = useContext(gameContext);

   // Variables
   const rowId = props.rowId;
   const cards = gameState.rows[rowId].cardIds;
   
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
                      <Card 
                        setCardFocus={props.setCardFocus} 
                        playerHeroId={cardId} 
                        playerNum={props.playerNum} 
                        rowId={props.rowId}
                      />
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
