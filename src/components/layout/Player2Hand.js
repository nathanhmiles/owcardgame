import Card from '../cards/Card';
import Ana from '../heroes/Ana';
import Ashe from '../heroes/Ashe';
import Baptiste from '../heroes/Baptiste';
import Bastion from '../heroes/Bastion';
import Bob from '../heroes/Bob';
import Brigitte from '../heroes/Brigitte';

export default function Player2Hand(props) {
  const cards = [];
  
  return(
    <div id="player2hand" className="playerhand">
      <Card hero={Baptiste} />
      <Card hero={Bastion} />
      <Card hero={Brigitte} />
    </div>
  );
}