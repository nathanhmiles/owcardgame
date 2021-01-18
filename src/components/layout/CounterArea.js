import data from 'data';
import HeroCounter from 'components/layout/HeroCounter';

export default function CounterArea(props) {
  const type = props.type;
  
  // Create icons array and store ids of hero with icons inside
  const icons = [];
  for (let hero of Object.keys(data.heroes)) {
    if ('icon' in data.heroes[hero]) {
      icons.push(data.heroes[hero].id);
    }
  };
  
  return(
    <div className={`${type}-counterarea counterarea`}>
      {icons && icons.map((key) => {
          return (<HeroCounter heroId={data.heroes[key].id} key={data.heroes[key].id} />);
      })}
    </div>
  );
}