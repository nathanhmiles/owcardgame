import './App.css';
import PlayerArea from './components/layout/PlayerArea';
import PlayerBoard from './components/layout/PlayerBoard';
import owlogo from './assets/ow-logo-transparent.png'

function App() {
  return (
    <div>
      <PlayerArea playerNum={2} />
      <PlayerBoard playerNum={2}/>
      <br/>
        <div id="centerlogocontainer">
          <span className="title">Overwatch</span>
          <span className="credit">Game & Card Design by<br/>u/bwb912</span>
          <img src={owlogo} id="centerlogo" alt="owlogo"/>
          <span className="credit">Digitisation by<br/>Nathan H Miles</span>
          <span className="title">Card Game</span>
        </div>
      <br/>
      <PlayerBoard playerNum={1} />
      <PlayerArea playerNum={1} />
    </div>
  );
}

export default App;
