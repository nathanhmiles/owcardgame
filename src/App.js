import './App.css';
import PlayerArea from 'components/layout/PlayerArea';
import PlayerBoard from 'components/layout/PlayerBoard';
import TitleCard from 'components/layout/TitleCard';
import Footer from 'components/layout/Footer';


function App() {
  return (
    <div>
      <PlayerArea playerNum={2} />
      <PlayerBoard playerNum={2}/>
      <TitleCard />
      <PlayerBoard playerNum={1} />
      <PlayerArea playerNum={1} />
      <Footer />
    </div>
  );
}

export default App;
