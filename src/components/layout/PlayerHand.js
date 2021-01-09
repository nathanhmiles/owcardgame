import Card from '../cards/Card';
import Heroes from '../heroes/Heroes';

export default function PlayerHand(props) {
  const cards = [];

  // TODO: randomly add a specificed number of cards from heroes to hand
  // be aware of cards already drawn/discarded - add a boolean attribute to cards
  function drawCards(num) {
    
  }

  return(
    <div className="playerhand">
      <Card hero={Heroes.Ana} />
      <Card hero={Heroes.Ashe} />
      <Card hero={Heroes.Bob} />
    </div>
  ); 
}