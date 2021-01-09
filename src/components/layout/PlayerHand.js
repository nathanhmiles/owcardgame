import Card from 'components/cards/Card';
import Heroes from 'components/cards/Heroes';

export default function PlayerHand(props) {
  let cards = [];

  // returns random number between min (inc) and max (exc)
  function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // TODO: randomly add a specificed number of cards from heroes to hand
  // be aware of cards already drawn/discarded
  function drawCards(num) {
    for (let i = 0; i < num; i++) {
      let keys = Object.keys(Heroes);
      const randInt = getRandInt(0, keys.length);
      const selectedHero = keys[randInt];
      cards.push(Heroes[selectedHero]);
    }
  }

  drawCards(3);

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