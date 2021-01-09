import Heroes from 'components/cards/Heroes';
import HeroCounter from 'components/layout/HeroCounter';

export default function CounterArea() {
  return(
    <div className="counterarea">
      {Object.keys(Heroes).map((hero) => {
        if ('icon' in Heroes[hero]) {
          return (<HeroCounter hero={Heroes[hero]} />);
        } else {return(null)}
      })}
    </div>
  );
}