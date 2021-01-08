import './App.css';
import Player1Area from './components/layout/Player1Area';
import Player1Board from './components/layout/Player1Board';
import Player2Area from './components/layout/Player2Area';
import Player2Board from './components/layout/Player2Board';
import owlogo from './assets/ow-logo-transparent.png'

function App() {
  return (
    <div>
      <Player2Area />
      <Player2Board />
      <br/>
        <div id="centerlogocontainer">
          <span>Overwatch</span>
          <span className="credit">Game Design & Art by<br/>u/bwb912</span>
          <img src={owlogo} id="centerlogo" alt="owlogo"/>
          <span className="credit">Digitisation by<br/>Nathan H Miles</span>
          <span>Card Game</span>
        </div>
      <br/>
      <Player1Board />
      <Player1Area />
    </div>
  );
}

export default App;
