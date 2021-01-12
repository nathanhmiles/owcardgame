import React, { useState } from 'react';
import Card from 'components/cards/Card';
import data from 'data';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

export default function PlayerHand(props) {
  const [hand, setHand] =  useState([]);
  

  // returns random number between min (inc) and max (exc)
  function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // TODO: randomly add a specificed number of cards from heroes to hand
  // TODO: check if card already drawn/discarded by that player
  function drawCards() {
    const randInt = getRandInt(0, Object.keys(data.heroes).length);
    const randKey = Object.keys(data.heroes)[randInt];
    const newCard = data.heroes[randKey];
    setHand(prevHand => {
      return [...prevHand, newCard]
    })
  }

  function handleOnDragEnd(result) {
    if(!result.destination) return;
    const items = Array.from(hand);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setHand(items);
  }

  return(
    <div className="playerhand">
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="playerhand" direction="horizontal">
      {(provided) => (
        <ul className="handlist" {...provided.droppableProps} ref={provided.innerRef}>
          {hand && hand.map((card, index) => {
            return(
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Card hero={card} />
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
      
      </Droppable>
    </DragDropContext>
    <button style={{width: '50px', height: '50px'}} onClick={drawCards}>Draw</button>
    </div>
  ); 
}