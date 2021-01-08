import './App.css';
import Player1Area from './components/layout/Player1Area';
import Player2Area from './components/layout/Player2Area';
import owlogo from './assets/ow-logo-transparent.png'

function App() {
  return (
    <div>
      <Player1Area />
      <br/>
        <div id="centerlogocontainer">
          <span>Overwatch</span>
          <span className="credit">Game Design & Art by<br/>u/bwb912</span>
          <img src={owlogo} id="centerlogo" />
          <span className="credit">Digitisation by<br/>Nathan H Miles</span>
          <span>Card Game</span>
        </div>
      <br/>
      <Player2Area />
    </div>
  );
}

export default App;
