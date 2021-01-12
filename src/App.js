import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import './App.css';
import PlayerArea from 'components/layout/PlayerArea';
import PlayerBoard from 'components/layout/PlayerBoard';
import TitleCard from 'components/layout/TitleCard';
import Footer from 'components/layout/Footer';

function handleOnDragEnd(result) {
  //TODO: implement dragdropcontext here, remove from playerhand
}

function App() {
  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <PlayerArea playerNum={2} />
        <PlayerBoard playerNum={2}/>
        <TitleCard />
        <PlayerBoard playerNum={1} />
        <PlayerArea playerNum={1} />
      </DragDropContext>
      <Footer />
    </div>
  );
}

export default App;
