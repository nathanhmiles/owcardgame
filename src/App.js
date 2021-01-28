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
  UPDATE_CARD: "update-card",
  ADD_CARD: "add-card",
  MOVE_CARD: "move-card",
  SET_POWER: "set-power",
  SET_SYNERGY: "set-synergy",
};

function reducer(gameState, action) {
  const playerNum = action.payload.playerNum;
  const heroId = action.payload.heroId;
  const cardId = action.payload.cardId;
  const rowId = action.payload.rowId;
  const rowPosition = action.payload.rowPosition;
  let updateKeys = action.payload.updateKeys;
  let updateValues = action.payload.updateValues;

  switch (action.type) {
    // Replace a value
    case ACTIONS.EDIT_CARD:
      return produce(gameState, (draft) => {
        let targetCard =
          draft.playerCards[`player${playerNum}cards`].cards[cardId];
        for (let i = 0; i < updateKeys.length; i++) {
          targetCard[updateKeys[i]] = updateValues[i]
        }
      });
    
    // Update value based on previous value
    case ACTIONS.UPDATE_CARD:
      return produce(gameState, (draft) => {
        let targetCard =
          draft.playerCards[`player${playerNum}cards`].cards[cardId];
        for (let i = 0; i < updateKeys.length; i++) {
          targetCard[updateKeys[i]] += updateValues[i]
        }
      });
    
    // Adds a card to player's cards (doesn't add to a row)
    case ACTIONS.ADD_CARD:
      const newCard = helper.createPlayerCard(playerNum,heroId);
      return produce(gameState, (draft) => {
        draft.playerCards[`player${playerNum}cards`].cards[newCard.playerHeroId] = newCard;
      });
    
    // Moves a card within or between rows
    case ACTIONS.MOVE_CARD:
      const startRowState = action.payload.startRowState;
      const finishRowState = action.payload.finishRowState;

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
        return produce(gameState, (draft) => {
          draft.rows[rowId].cardIds = action.payload.newCardIds;
        });
        
      }
    
    // Sets player power
    case ACTIONS.SET_POWER:
      const powerValue = action.payload.powerValue;
      return produce(gameState, (draft) => {
        draft.rows[`player${playerNum}hand`].power[rowPosition] = powerValue;
      });
    
    // Sets row synergy
    case ACTIONS.SET_SYNERGY:
      const synergyCost = action.payload.synergyCost;
      return produce(gameState, (draft) => {
        draft.rows[rowId].synergy -= synergyCost;
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
