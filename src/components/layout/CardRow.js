import React, { useState } from 'react';
<<<<<<< Updated upstream
import {Droppable, Draggable} from 'react-beautiful-dnd';
import SynergyCounter from './SynergyCounter';
import Card from 'components/cards/Card';
import CounterArea from 'components/layout/CounterArea';
import data from 'data';
=======
import SynergyCounter from './SynergyCounter';
import Card from 'components/cards/Card';
import CounterArea from 'components/layout/CounterArea';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
>>>>>>> Stashed changes

export default function CardRow(props) {
  const [rowCards, setRowCards] = useState([]);
  const synergy = 0;
<<<<<<< Updated upstream
=======
  const [rowCards, setRowCards] = useState([]);
>>>>>>> Stashed changes
  
  function handleOnDragEnd(result) {
    if(!result.destination) return;
    const items = Array.from(rowCards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRowCards(items);
  }

  return (
    <div className="rowarea">
      <CounterArea />
      <div className="cardrow">
      <div className="rowlabel">{props.label}</div>
      <Droppable droppableId={props.id} direction="horizontal">
      {(provided) => (
        <ul id={props.id} className="rowlist" {...provided.droppableProps} ref={provided.innerRef}>
        {rowCards && rowCards.map((card) => {return(
          <li>
            <Card hero={card} key={card.id} />
          </li>
        )})}
        {provided.placeholder}
        </ul>
      )}
      </Droppable>
      </div>
      <SynergyCounter synergy={synergy} />
    </div>
  );
}