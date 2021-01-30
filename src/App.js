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
  CREATE_CARD: "create-card",
  ADD_CARD_TO_HAND: "add-card-to-hand",
  EDIT_CARD: "edit-card",
  UPDATE_CARD: "update-card",
  MOVE_CARD: "move-card",
  ADD_ROW_EFFECT: "add-row-effect",
  ADD_CARD_EFFECT: "add-card-effect",
  SET_POWER: "set-power",
  UPDATE_SYNERGY: "update-synergy",
};

function reducer(gameState, action) {

  switch (action.type) {
    // Adds a card to player's cards (doesn't add to a row)
    case ACTIONS.CREATE_CARD:
      {
        // Required variables
        const playerNum = action.payload.playerNum;
        const heroId = action.payload.heroId;
        const newCard = helper.createPlayerCard(playerNum,heroId);

        // Add new card to playercards data (does not add the card to any row)
        // Call Move_Card to make card visible
        return produce(gameState, (draft) => {
          draft.playerCards[`player${playerNum}cards`].cards[newCard.playerHeroId] = newCard;
        });
      }
    
    case ACTIONS.ADD_CARD_TO_HAND:
      {
        const playerNum = action.payload.playerNum;
        const playerHeroId = action.payload.playerHeroId;
        return produce(gameState, (draft) => {
          draft.rows[`player${playerNum}hand`].cardIds.push(playerHeroId);
        });
      }

    // Replace a value
    case ACTIONS.EDIT_CARD:
      {
        // Required variables
        const playerNum = action.payload.playerNum;
        const targetCardId = action.payload.targetCardId;
        const editKeys = action.payload.editKeys;
        const editValues = action.payload.editValues;
        
        // Identify affected card and apply all edits
        return produce(gameState, (draft) => {
          let targetCard =
            draft.playerCards[`player${playerNum}cards`].cards[targetCardId];
          console.log(targetCard)
          for (let i = 0; i < editKeys.length; i++) {
            targetCard[editKeys[i]] = editValues[i];
          }
        });
      }

    // Update value based on previous value
    case ACTIONS.UPDATE_CARD:
      {
        // Required variables
        const playerNum = action.payload.playerNum;
        const cardId = action.payload.cardId;
        const updateKeys = action.payload.updateKeys;
        const updateValues = action.payload.updateValues;

        // Identify affected card and apply all updates
        return produce(gameState, (draft) => {
          let targetCard =
            draft.playerCards[`player${playerNum}cards`].cards[cardId];

          for (let i = 0; i < updateKeys.length; i++) {
            targetCard[updateKeys[i]] += updateValues[i]
          }
        });
      }
    
    
    // Moves a card within or between rows
    case ACTIONS.MOVE_CARD:
      {
        // Variables from payload
        const targetCardId = action.payload.targetCardId;
        const startRowId = action.payload.startRowId;
        const startIndex = action.payload.startIndex;
        const finishRowId = action.payload.finishRowId;
        const finishIndex = action.payload.finishIndex;

        // Variables from game state
        const startRow = gameState.rows[startRowId];
        const finishRow = gameState.rows[finishRowId];
        
        // Move card within same row
        if (startRowId === finishRowId) {
          const rowId = startRowId;
          const row = startRow;
          const newCardIds = Array.from(row.cardIds);
          newCardIds.splice(startIndex, 1);
          newCardIds.splice(finishIndex, 0, targetCardId);
          
          return produce(gameState, (draft) => {
            draft.rows[rowId].cardIds = newCardIds;
          });
        } 
        
        // Moving from one row to another
        const newStartRowCardIds = Array.from(startRow.cardIds);
        newStartRowCardIds.splice(startIndex, 1);

        const newFinishRowCardIds = Array.from(finishRow.cardIds);
        newFinishRowCardIds.splice(finishIndex, 0, targetCardId);
        
        return produce(gameState, (draft) => {
          draft.rows[startRowId].cardIds = newStartRowCardIds;
          draft.rows[finishRowId].cardIds = newFinishRowCardIds;
        });
        
      }

      // Add hero effect to a row
      case ACTIONS.ADD_ROW_EFFECT:
        {
          const targetRow = action.payload.targetRow;
          const rowEffect = action.payload.rowEffect;
          
          return produce(gameState, (draft) => {
            draft.rows[targetRow].effects.push(rowEffect);
          });
        }
      
      // Add hero effect to a card
      case ACTIONS.ADD_CARD_EFFECT:
        {
          return produce(gameState, (draft) => {

          });
        }

      // Sets player power
      case ACTIONS.SET_POWER:
        {
          // Required variables
          const playerNum = action.payload.playerNum;
          const rowPosition = action.payload.rowPosition;
          const powerValue = action.payload.powerValue;
          
          return produce(gameState, (draft) => {
            draft.rows[`player${playerNum}hand`].power[rowPosition] = powerValue;
          });
        }
      
      // Sets row synergy
      case ACTIONS.UPDATE_SYNERGY:
        {
          // Required variables
          const rowId = action.payload.rowId;
          const synergyCost = action.payload.synergyCost;

          // Subtract synergy cost from current row synergy
          return produce(gameState, (draft) => {
            draft.rows[rowId].synergy += synergyCost;
          });
        }
  
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

    // Get card movement data
    const startRowId = source.droppableId;
    const finishRowId = destination.droppableId;
    const playerNum = parseInt(finishRowId[0]);
    const finishPosition = finishRowId[1];
    let finishSynergy = gameState.rows[finishRowId].synergy;

    // Apply card movement
    dispatch({
      type: ACTIONS.MOVE_CARD, payload: { 
        targetCardId: draggableId,
        startRowId: startRowId, 
        finishRowId: finishRowId,
        startIndex: source.index,
        finishIndex: destination.index, 
      },
    });
    
    // If not moving card within player's hand (i.e. moving into a row),
    // Set new row synergy and set card to played 
    if (finishRowId[0] !== 'p') {
      
      // Set new row synergy
      const addSynergy =
      gameState.playerCards[`player${playerNum}cards`].cards[draggableId]
        .synergy[finishPosition];
        
      dispatch({type: ACTIONS.UPDATE_SYNERGY, payload: {
        rowId: finishRowId,
        synergyCost: addSynergy,
      }});

      // Set card to played
      dispatch({
        type: ACTIONS.EDIT_CARD,
        payload: {
          playerNum: playerNum,
          targetCardId: draggableId,
          editKeys: ['isPlayed', 'synergy'],
          editValues: [true, { f: 0, m: 0, b: 0 }],
        },
      });
    }
    return;
    
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
