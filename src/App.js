import React, { useState, useReducer, useMemo } from "react";
import gameContext from "context/gameContext";
import turnContext from "context/turnContext";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import PlayerHalf from "components/layout/PlayerHalf";
import TitleCard from "components/layout/TitleCard";
import Footer from "components/layout/Footer";
import CardFocus from "components/cards/CardFocus";
import data from "data";
import helper from "helper";
import produce from "immer";

export const ACTIONS = {
  EDIT_CARD: "edit-card",
  ADD_CARD: "add-card",
  MOVE_CARD: "move-card",
  SET_POWER: "set-power",
};

function reducer(gameState, action) {
  switch (action.type) {
    case ACTIONS.EDIT_CARD:
      return produce(gameState, (draft) => {
        let targetCard =
          draft.playerCards[`player${action.payload.playerNum}cards`].cards[
            action.payload.cardId
          ];
        for (let i = 0; i < action.payload.updateKeys.length; i++) {
          targetCard[action.payload.updateKeys[i]] = action.payload.updateValues[i]
        }
      });

    case ACTIONS.ADD_CARD:
      const newCard = helper.createPlayerCard(
        action.payload.playerNum,
        action.payload.heroId
      );
      return produce(gameState, (draft) => {
        draft.playerCards[`player${action.payload.playerNum}cards`].cards[newCard.playerHeroId] = newCard;
      });

    case ACTIONS.MOVE_CARD:
      // Move card between different rows
      if ("finishRowId" in action.payload) {
        const startRowId = action.payload.startRowId;
        const finishRowId = action.payload.finishRowId;
        return produce(gameState, (draft) => {
          draft.rows[startRowId] = action.payload.startRowState;
          draft.rows[finishRowId] = action.payload.finishRowState;
        });
        
      }
      // Move card within a row
      else {
        const rowId = action.payload.rowId;
        return produce(gameState, (draft) => {
          draft.rows[rowId].cardIds = action.payload.newCardIds;
        });
        
      }

    case ACTIONS.SET_POWER:
      return produce(gameState, (draft) => {
        draft.rows[`player${action.payload.playerNum}hand`].power[action.payload.rowPosition] = action.payload.powerValue;
      });

    default:
      return gameState;
  }
}

export default function App() {
  const [gameState, dispatch] = useReducer(reducer, data);
  const gameContextProvider = useMemo(() => {
    return { gameState, dispatch };
  }, [gameState, dispatch]);

  const [matchState, setMatchState] = useState({
    player1: { wins: 0 },
    player2: { wins: 0 },
    wonLastMatch: 0,
  });
  const [turnState, setTurnState] = useState({
    turnCount: 1,
    playerTurn: helper.getRandInt(1, 3),
  });
  const [cardFocus, setCardFocus] = useState(null);
  const [nextCardDraw, setNextCardDraw] = useState({
    player1: null,
    player2: null,
  });

  function handleOnDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const start = gameState.rows[source.droppableId];
    const finish = gameState.rows[destination.droppableId];
    const playerNum = parseInt(finish.id[0]);
    const finishPosition = finish.id[1];
    let finishSynergy = finish.synergy;

    // If moving within the same row
    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newRow = {
        ...start,
        cardIds: newCardIds,
      };

      const newState = {
        ...gameState,
        rows: {
          ...gameState.rows,
          [newRow.id]: newRow,
        },
      };

      dispatch({
        type: ACTIONS.MOVE_CARD,
        payload: { rowId: newRow.id, newCardIds: newCardIds },
      });
      return;
    }

    // Moving from one list to another
    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardIds: startCardIds,
    };

    // Get the synergy value that the dragged card applies to the destination row
    const addSynergy =
      gameState.playerCards[`player${playerNum}cards`].cards[draggableId]
        .synergy[finishPosition];

    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
      synergy: finish.synergy + addSynergy,
    };

    // Set the order of the new rows, and set dragged card synergy to 0
    const newState = {
      ...gameState,
      rows: {
        ...gameState.rows,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    dispatch({
      type: ACTIONS.MOVE_CARD,
      payload: {
        startRowId: newStart.id,
        startRowState: newStart,
        finishRowId: newFinish.id,
        finishRowState: newFinish,
      },
    });

    dispatch({
      type: ACTIONS.EDIT_CARD,
      payload: {
        playerNum: playerNum,
        cardId: draggableId,
        updateKeys: ['isPlayed', 'synergy'],
        updateValues: [true, { f: 0, m: 0, b: 0 }],
      },
    });
  }

  return (
    <div>
      <turnContext.Provider value={{ turnState, setTurnState }}>
        <gameContext.Provider value={gameContextProvider}>
          <Footer />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <PlayerHalf
              playerNum={2}
              setCardFocus={setCardFocus}
              nextCardDraw={nextCardDraw}
              setNextCardDraw={setNextCardDraw}
            />
            <TitleCard />
            <PlayerHalf
              playerNum={1}
              setCardFocus={setCardFocus}
              nextCardDraw={nextCardDraw}
              setNextCardDraw={setNextCardDraw}
            />
          </DragDropContext>
          {cardFocus && (
            <CardFocus
              setCardFocus={setCardFocus}
              unsetCardFocus={() => {
                setCardFocus(null);
              }}
              cardFocus={cardFocus}
              setNextCardDraw={setNextCardDraw}
            />
          )}
          <Footer />
        </gameContext.Provider>
      </turnContext.Provider>
    </div>
  );
}
