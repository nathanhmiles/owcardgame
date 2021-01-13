import React, { useState, useContext } from "react";
import rowsContext from 'context/rowsContext';
import { Droppable, Draggable } from "react-beautiful-dnd";
import SynergyCounter from "./SynergyCounter";
import Card from "components/cards/Card";
import CounterArea from "components/layout/CounterArea";
import CardDisplay from 'components/layout/CardDisplay';
import data from "data";

export default function BoardRow(props) {
  const {rowsState, setRowsState} = useContext(rowsContext);
  const synergy = rowsState[props.id].synergy;

  return (
    <div className="rowarea">
      <CounterArea />
      <div className="rowlabel">{props.label}</div>
      <div className="boardrow row">
        <CardDisplay 
          playerNum={props.playerNum}
          droppableId={props.id}
          listClass="rowlist row"
          rowId={props.id}
        />
      </div>
      <SynergyCounter synergy={synergy} />
    </div>
  );
}




