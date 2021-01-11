import Heroes from 'components/cards/Heroes';
import HeroCounter from 'components/layout/HeroCounter';

export default function CounterArea() {
  return(
    <div className="counterarea">
      {Heroes.map((hero, index) => {
        if ('icon' in hero) {
          return (<HeroCounter hero={hero} key={hero.id} />);
        } else {return(null)}
      })}
    </div>
  );
}