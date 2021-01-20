import React, { useState } from "react";
import gameContext from 'context/gameContext';
import turnContext from 'context/turnContext';
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import PlayerHalf from "components/layout/PlayerHalf";
import TitleCard from "components/layout/TitleCard";
import Footer from "components/layout/Footer";
import CardFocus from 'components/cards/CardFocus';
import data from "data";

function App() {
  const [gameState, setGameState] = useState(data);
  const [turnState, setTurnState] = useState(1);
  const [cardFocus, setCardFocus] = useState(null);

  function handleOnDragEnd(result) {
    const { destination, source, draggableId} = result;
    if (!destination) return;
    
    const start = gameState.rows[source.droppableId];
    const finish = gameState.rows[destination.droppableId];

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

    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    const newState = {
      ...gameState,
      rows: {
        ...gameState.rows,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
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
        {cardFocus && <CardFocus 
          setCardFocus={setCardFocus}
          unsetCardFocus={() => {setCardFocus(null)}} 
          cardFocus={cardFocus}
        />}
        <Footer />
      </gameContext.Provider>
      </turnContext.Provider>
    </div>
  );
}

export default App;
