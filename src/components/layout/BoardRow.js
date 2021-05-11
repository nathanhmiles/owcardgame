import React, { useContext, useEffect, useState } from "react";
import gameContext from "context/gameContext";
import SynergyCounter from "components/layout/SynergyCounter";
import ShieldCounter from "components/cards/ShieldCounter";
import CounterArea from "components/layout/CounterArea";
import CardDisplay from "components/layout/CardDisplay";
import { ACTIONS } from "App";
import $ from "jquery";
import { checkIsOverflown } from "helper";

export default function BoardRow(props) {
  // Context
  const { gameState, dispatch } = useContext(gameContext);
  const [isOverflown, setIsOverflown] = useState(false);

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

  // Detect if board row is overflown, and set class if it is

  // TODO: not performing well
  // $(function () {
  //   const boardRow = document.getElementById(`${rowId}-boardrow`);
  //   const rowList = document.getElementById(`${rowId}-list`);
  //   const resizeObserver = new ResizeObserver((element) => {
  //     if (checkIsOverflown(boardRow)) {
  //       console.log(`${rowId} overflown`);
  //       setIsOverflown(true);
  //     } else {
  //       setIsOverflown(false);
  //     }
  //   });
  //   resizeObserver.observe(boardRow);
  // });

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
      <div
        id={`${rowId}-boardrow`}
        className={`boardrow ${isOverflown ? "overflown" : ""}`}
      >
        <div className="rowlabel">
          <span>{props.label}</span>
          <span>Row</span>
        </div>
        <CardDisplay
          playerNum={props.playerNum}
          droppableId={props.rowId}
          listClass="rowlist"
          rowId={props.rowId}
          setCardFocus={props.setCardFocus}
        />
      </div>
    </div>
  );
}
