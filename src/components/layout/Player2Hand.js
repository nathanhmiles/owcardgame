import Card from '../cards/Card';
import Ana from '../heroes/Ana';
import Ashe from '../heroes/Ashe';
import Baptiste from '../heroes/Baptiste';
import Bastion from '../heroes/Bastion';
import Bob from '../heroes/Bob';

export default function Player2Hand(props) {
    
  return(
    <div id="player2hand" className="playerhand">
      <div id="player2name" className="playername">Player 2</div> 
      <Card hero={Ana} />
      <Card hero={Ashe} />
      <Card hero={Bob} />
    </div>
  ); 
}