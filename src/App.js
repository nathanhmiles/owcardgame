import React, { useState } from "react";
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

function App() {
  const [gameState, setGameState] = useState(data);
  const [matchState, setMatchState] = useState({
    player1: { wins: 0 },
    player2: { wins: 0 },
    wonLastMatch: 0,
  });
  const [turnState, setTurnState] = useState(helper.getRandInt(1, 3));
  const [cardFocus, setCardFocus] = useState(null);

  console.log(gameState);

  function handleOnDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const start = gameState.rows[source.droppableId];
    const finish = gameState.rows[destination.droppableId];
    const playerNum = finish.id[0];
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

      setGameState(newState);
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
      gameState.playerCards[`player${playerNum}cards`].cards[draggableId].synergy[
        finishPosition
      ];

    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
      synergy: (finish.synergy + addSynergy),
    };

    // Set the order of the new rows, and set dragged card synergy to 0
    const newState = {
      ...gameState,
      rows: {
        ...gameState.rows,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
      playerCards: {
        ...gameState.playerCards,
        [`player${playerNum}cards`]: {
          ...gameState.playerCards[`player${playerNum}cards`],
          cards: {
            ...gameState.playerCards[`player${playerNum}cards`].cards,
            [draggableId]: {
              ...gameState.playerCards[`player${playerNum}cards`].cards[draggableId],
              isPlayed: true,
              synergy: {
                f: 0,
                m: 0,
                b: 0,
              },
            },
          },
        },
      },
    };

    setGameState(newState);
  }

  return (
    <div>
      <turnContext.Provider value={{ turnState, setTurnState }}>
        <gameContext.Provider value={{ gameState, setGameState }}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <PlayerHalf playerNum={2} setCardFocus={setCardFocus} />
            <TitleCard />
            <PlayerHalf playerNum={1} setCardFocus={setCardFocus} />
          </DragDropContext>
          {cardFocus && (
            <CardFocus
              setCardFocus={setCardFocus}
              unsetCardFocus={() => {
                setCardFocus(null);
              }}
              cardFocus={cardFocus}
            />
          )}
          <Footer />
        </gameContext.Provider>
      </turnContext.Provider>
    </div>
  );
}

export default App;
