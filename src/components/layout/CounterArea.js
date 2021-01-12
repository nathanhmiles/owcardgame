import data from 'data';
import HeroCounter from 'components/layout/HeroCounter';

export default function CounterArea() {
  return(
    <div className="counterarea">
      {Object.keys(data.heroes).map((key, index) => {
        if ('icon' in data.heroes[key]) {
          return (<HeroCounter hero={data.heroes[key]} key={data.heroes[key].id} />);
        } else {return(null)}
      })}
    </div>
  );
}