import React, { useState, useContext, useEffect } from "react";
import rowsContext from 'context/rowsContext';
import { Droppable, Draggable } from "react-beautiful-dnd";
import SynergyCounter from "./SynergyCounter";
import Card from "components/cards/Card";
import CounterArea from "components/layout/CounterArea";
import CardDisplay from 'components/layout/CardDisplay';
import data from "data";

export default function BoardRow(props) {
  const {rowsState, setRowsState} = useContext(rowsContext);
  const rowCards = rowsState[props.rowId].cardIds;

  useEffect(() => {
    if ('synergy' in rowsState[props.rowId]) {
      let rowSynergy = 0;
      for (let cardId of rowCards) {
        const rowPosition = props.rowId[1];
        const heroId = cardId.slice(1, cardId.length);
        rowSynergy += data.heroes[heroId].synergy[rowPosition];
      }
      setRowsState(prevState => ({
        ...prevState,
        [props.rowId]: {
          ...prevState[props.rowId],
          synergy: rowSynergy,
        }
      }))
    }
  }, [rowCards]);

  
  const synergy = rowsState[props.rowId].synergy;

  return (
    <div className="rowarea">
      <CounterArea />
      <div className="rowlabel">{props.label}</div>
      <div className="boardrow row">
        <CardDisplay 
          playerNum={props.playerNum}
          droppableId={props.rowId}
          listClass="rowlist row"
          rowId={props.rowId}
          setCardFocus={props.setCardFocus} 
        />
      </div>
      <SynergyCounter synergy={synergy} />
    </div>
  );
}




