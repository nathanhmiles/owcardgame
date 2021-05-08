import React, { useContext, useEffect } from "react";
import gameContext from "context/gameContext";
import SynergyCounter from "components/layout/SynergyCounter";
import ShieldCounter from "components/cards/ShieldCounter";
import CounterArea from "components/layout/CounterArea";
import CardDisplay from "components/layout/CardDisplay";
import { ACTIONS } from "App";

export default function BoardRow(props) {
  // Context
  const { gameState, dispatch } = useContext(gameContext);

  // Variables
  const rowId = props.rowId;
  const rowPosition = props.rowId[1];
  const playerNum = props.playerNum;
  const synergyValue = gameState.rows[rowId].synergy;
  const rowShield = gameState.rows[rowId].totalShield();

  // Update synergy and power values anytime a card moves row
  useEffect(() => {
    let playerPower = 0;

    // For every card in the row (that is alive), add up the power values
    for (let cardId of gameState.rows[rowId].cardIds) {
      if (
        gameState.playerCards[`player${playerNum}cards`].cards[cardId].health >
        0
      ) {
        playerPower +=
          gameState.playerCards[`player${playerNum}cards`].cards[cardId].power[
            rowPosition
          ];
      }
    }

    // Set power state
    dispatch({
      type: ACTIONS.SET_POWER,
      payload: {
        playerNum: playerNum,
        rowPosition: rowPosition,
        powerValue: playerPower,
      },
    });
  }, [
    gameState.rows,
    gameState.playerCards,
    dispatch,
    playerNum,
    rowId,
    rowPosition,
  ]);

  return (
    <div id={rowId} className="rowarea row">
      <div className="rowcountercontainer">
        <div>
          <SynergyCounter synergy={synergyValue} />
          {rowShield > 0 && (
            <ShieldCounter type="rowcounter" shield={rowShield} />
          )}
        </div>
        <CounterArea
          type={"row"}
          setCardFocus={props.setCardFocus}
          playerNum={props.playerNum}
          rowId={props.rowId}
        />
      </div>
      <div className="boardrow">
        <div className="rowlabel">{props.label}</div>
        <CardDisplay
          playerNum={props.playerNum}
          droppableId={props.rowId}
          listClass="rowlist cardRow"
          rowId={props.rowId}
          setCardFocus={props.setCardFocus}
          direction="vertical"
        />
      </div>
    </div>
  );
}
