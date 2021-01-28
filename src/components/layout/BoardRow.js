import React, { useContext, useEffect } from "react";
import gameContext from "context/gameContext";
import SynergyCounter from "./SynergyCounter";
import CounterArea from "components/layout/CounterArea";
import CardDisplay from "components/layout/CardDisplay";
import { ACTIONS } from "App";

export default function BoardRow(props) {
  const { gameState, dispatch } = useContext(gameContext);
  const rowId = props.rowId;
  const rowCards = gameState.rows[rowId].cardIds;
  const playerNum = props.playerNum;
  const playerHand = `player${playerNum}hand`;
  const synergyValue = gameState.rows[rowId].synergy;

  // Update synergy and power values anytime a card moves row
  useEffect(() => {
    let playerPower = 0;
    const rowPosition = props.rowId[1];

    // For every card in the row, add up the power and synergy values
    for (let cardId of rowCards) {
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

    // Set power and synergy state
    dispatch({
      type: ACTIONS.SET_POWER,
      payload: {
        playerNum: playerNum,
        rowPosition: rowPosition,
        powerValue: playerPower,
      },
    });


    // TODO: Not all dependencies here, check
  }, [rowCards, gameState.playerCards[`player${playerNum}cards`]]);

  return (
    <div id={rowId} className="rowarea row">
      <CounterArea
        type={"row"}
        setCardFocus={props.setCardFocus}
        playerNum={props.playerNum}
        rowId={props.rowId}
      />
      <div className="rowlabel">{props.label}</div>
      <div className="boardrow cardRow">
        <CardDisplay
          playerNum={props.playerNum}
          droppableId={props.rowId}
          listClass="rowlist cardRow"
          rowId={props.rowId}
          setCardFocus={props.setCardFocus}
        />
      </div>
      <SynergyCounter synergy={synergyValue} />
    </div>
  );
}
