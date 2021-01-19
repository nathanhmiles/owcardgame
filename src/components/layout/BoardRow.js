import React, { useContext, useEffect } from "react";
import gameContext from "context/gameContext";
import SynergyCounter from "./SynergyCounter";
import CounterArea from "components/layout/CounterArea";
import CardDisplay from "components/layout/CardDisplay";

export default function BoardRow(props) {
  const { gameState, setGameState } = useContext(gameContext);
  const rowId = props.rowId;
  const rowCards = gameState.rows[rowId].cardIds;
  const playerNum = props.playerNum;
  const playerHand = `player${playerNum}hand`;

  // Update synergy and power values anytime a card moves row
  useEffect(() => {
    let playerPower = 0;
    let rowSynergy = 0;
    const rowPosition = props.rowId[1];

    // For every card in the row, add up the power and synergy values
    for (let cardId of rowCards) {
      playerPower += gameState.playerCards[`player${playerNum}cards`].cards[cardId].power[rowPosition];
      rowSynergy += gameState.playerCards[`player${playerNum}cards`].cards[cardId].synergy[rowPosition];
    }

    // Set power and synergy state
    setGameState(prevState => ({
      ...prevState,
      rows: {
        ...prevState.rows,
        [playerHand]: {
          ...prevState.rows[playerHand],
          power: {
            ...prevState.rows[playerHand].power,
              [rowPosition]: playerPower,
          }, 
        },
        [rowId]: {
          ...prevState.rows[rowId],
          synergy: rowSynergy,
        }
      },
    }));

    // TODO: Not all dependencies here, check
  }, [rowCards]);

  return (
    <div className="rowarea">
      <CounterArea 
        type={'row'} 
        setCardFocus={props.setCardFocus} 
        playerNum={props.playerNum} 
        rowId = {props.rowId}
      />
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
      <SynergyCounter synergy={gameState.rows[rowId].synergy} />
    </div>
  );
}
