import React, { useState } from "react";
import rowsContext from "context/rowsContext";
import playerCardsContext from 'context/playerCardsContext';
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import PlayerArea from "components/layout/PlayerArea";
import PlayerBoard from "components/layout/PlayerBoard";
import TitleCard from "components/layout/TitleCard";
import Footer from "components/layout/Footer";
import data from "data";

function App() {
  const [rowsState, setRowsState] = useState(data.rows);
  const [playerCards, setPlayerCards] = useState(data.playercards);

  function handleOnDragEnd(result) {
    const { destination, source, draggableId} = result;
    console.log(result);
    if (!destination) return;
    
    const start = rowsState[source.droppableId];
    const finish = rowsState[destination.droppableId];

    // If moving within the same row
    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      
      const newRow = {
        ...start,
        cardIds: newCardIds,
      };
      console.log({...newRow})
      
      const newState = {
        ...rowsState,
        [newRow.id]: newRow,
      };
      console.log({...newState});
      
      setRowsState(newState);
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
      ...rowsState,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };
    
    setRowsState(newState);


  }

  return (
    <div>
      <rowsContext.Provider value={{ rowsState, setRowsState }}>
      <playerCardsContext.Provider value={{ playerCards, setPlayerCards }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <PlayerArea playerNum={2} />
          <PlayerBoard playerNum={2} />
          <TitleCard />
          <PlayerBoard playerNum={1} />
          <PlayerArea playerNum={1} />
        </DragDropContext>
        <Footer />
        </playerCardsContext.Provider>
      </rowsContext.Provider>
    </div>
  );
}

export default App;
