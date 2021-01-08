import Card from '../cards/Card';
import Ana from '../heroes/Ana';
import Ashe from '../heroes/Ashe';
import Baptiste from '../heroes/Baptiste';
import Bastion from '../heroes/Bastion';
import Bob from '../heroes/Bob';
import Brigitte from '../heroes/Brigitte';

export default function Player1Hand(props) {
    
  return(
    <div id="player1hand" className="playerhand">
      <div id="player1name" className="playername">Player 1</div>
      <Card hero={Baptiste} />
      <Card hero={Bastion} />
      <Card hero={Brigitte} />
    </div>
  );
}