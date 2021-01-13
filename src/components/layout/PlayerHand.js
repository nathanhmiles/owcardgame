import React, { useContext } from 'react';
import Card from 'components/cards/Card';
import data from 'data';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import rowsContext from 'context/rowsContext';

export default function PlayerHand(props) {
  
  const { rowsState, setRowsState } = useContext(rowsContext);
  const playerHandId = `player${props.playerNum}hand`;

  const handCards = rowsState[playerHandId].cardIds;
  
  // returns random number between min (inc) and max (exc)
  function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // TODO: randomly add a specificed number of cards from heroes to hand
  // TODO: check if card already drawn/discarded by that player
  function drawCards() {
    const randInt = getRandInt(0, Object.keys(data.heroes).length);
    const randKey = Object.keys(data.heroes)[randInt];
    const newCardId = data.heroes[randKey].id;
    const newCardIds = [...rowsState[playerHandId].cardIds, newCardId];
    
    setRowsState({
      ...rowsState,
      [playerHandId]: {
        ...rowsState[playerHandId],
        cardIds: newCardIds
      }
    });
  }

  return(
    <div className="playerhand">
    
      <Droppable droppableId={`player${props.playerNum}hand`} direction="horizontal">
      {(provided) => (
        <ul className="handlist" {...provided.droppableProps} ref={provided.innerRef}>
          {handCards && handCards.map((cardId, index) => {
            return(
              <Draggable key={cardId} draggableId={cardId} index={index}>
                {(provided) => (
                  <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Card heroId={cardId} />
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
      
      </Droppable>
    <button style={{width: '50px', height: '50px'}} onClick={drawCards}>Draw</button>
    </div>
  ); 
}