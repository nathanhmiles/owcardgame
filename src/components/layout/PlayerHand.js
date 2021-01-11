import Card from 'components/cards/Card';
import Heroes from 'components/cards/Heroes';

export default function PlayerHand(props) {
  let cards = [];

  // returns random number between min (inc) and max (exc)
  function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // TODO: randomly add a specificed number of cards from heroes to hand
  // TODO: check if card already drawn/discarded by that player
  function drawCards(num) {
    for (let i = 0; i < num; i++) {
      const randInt = getRandInt(0, Heroes.length);
      cards.push(Heroes[randInt]);
    }
  }

  drawCards(6);

  return(
    <div className="playerhand">
      {cards && cards.map((card) => {
        return(
          <Card hero={card} key={card.name} />
        );
      })}
    </div>
  ); 
}