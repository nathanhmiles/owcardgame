import Card from '../cards/Card';
import Ana from '../heroes/Ana';
import Ashe from '../heroes/Ashe';
import Baptiste from '../heroes/Baptiste';
import Bastion from '../heroes/Bastion';
import Bob from '../heroes/Bob';

export default function Player1Hand(props) {
  const cards = [];

  return(
    <div id="player1hand" className="playerhand">
      <Card hero={Ana} />
      <Card hero={Ashe} />
      <Card hero={Bob} />
    </div>
  ); 
}