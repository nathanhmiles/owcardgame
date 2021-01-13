import React, { useState } from "react";
import rowsContext from "context/rowsContext";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import PlayerArea from "components/layout/PlayerArea";
import PlayerBoard from "components/layout/PlayerBoard";
import TitleCard from "components/layout/TitleCard";
import Footer from "components/layout/Footer";
import data from "data";

function App() {
  const [rowsState, setRowsState] = useState(data.rows);

  function handleOnDragEnd(result) {
    
    const { destination, source, draggableId} = result;
    if (!destination) return;
    
    const row = rowsState[source.droppableId];
    const newCardIds = Array.from(row.cardIds);
    newCardIds.splice(source.index, 1);
    newCardIds.splice(destination.index, 0, draggableId);
    
    const newRow = {
      ...row,
      cardIds: newCardIds,
    };
    
    const newState = {
      ...rowsState,
      rows: {
        ...rowsState.rows,
        [newRow.id]: newRow,
      }
    };
    
    setRowsState(newState);
  }

  return (
    <div>
      <rowsContext.Provider value={{ rowsState, setRowsState }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <PlayerArea playerNum={2} />
          <PlayerBoard playerNum={2} />
          <TitleCard />
          <PlayerBoard playerNum={1} />
          <PlayerArea playerNum={1} />
        </DragDropContext>
        <Footer />
      </rowsContext.Provider>
    </div>
  );
}

export default App;
