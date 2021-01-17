import React, { useState, useContext, useEffect } from "react";
import rowsContext from "context/rowsContext";
import SynergyCounter from "./SynergyCounter";
import CounterArea from "components/layout/CounterArea";
import CardDisplay from "components/layout/CardDisplay";
import data from "data";

export default function BoardRow(props) {
  const { rowsState, setRowsState } = useContext(rowsContext);
  const [rowSynergy, setRowSynergy] = useState(0);
  const playerPower = props.playerPower;
  const setPlayerPower = props.setPlayerPower;
  const rowCards = rowsState[props.rowId].cardIds;

  // Update synergy and power values anytime a card moves row
  useEffect(() => {
    let power = 0;
    let rowSynergy = 0;
    const rowPosition = props.rowId[1];

    // For every card in the row, add up the power and synergy values
    for (let cardId of rowCards) {
      const heroId = cardId.slice(1, cardId.length);
      power += data.heroes[heroId].power[rowPosition];
      rowSynergy += data.heroes[heroId].synergy[rowPosition];
    }

    // Set power and synergy state
    setPlayerPower(prevState => ({
      ...prevState,
      [rowPosition]: power,  
    }));
    setRowSynergy(rowSynergy);

    // TODO: Not all dependencies here, check
  }, [rowSynergy, rowsState]);

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
      <SynergyCounter synergy={rowSynergy} />
    </div>
  );
}
