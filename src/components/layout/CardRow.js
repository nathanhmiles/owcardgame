import React, { useState } from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import SynergyCounter from './SynergyCounter';
import Card from 'components/cards/Card';
import CounterArea from 'components/layout/CounterArea';
import data from 'data';

export default function CardRow(props) {
  const [rowCards, setRowCards] = useState([]);
  const synergy = 0;

  return (
    <div className="rowarea">
      <CounterArea />
      <div className="rowlabel">{props.label}</div>
      <div className="cardrow">
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