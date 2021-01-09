import './App.css';
import PlayerArea from 'components/layout/PlayerArea';
import PlayerBoard from 'components/layout/PlayerBoard';
import TitleCard from 'components/layout/TitleCard';

function App() {
  return (
    <div>
      <PlayerArea playerNum={2} />
      <PlayerBoard playerNum={2}/>
      <TitleCard />
      <PlayerBoard playerNum={1} />
      <PlayerArea playerNum={1} />
    </div>
  );
}

export default App;
