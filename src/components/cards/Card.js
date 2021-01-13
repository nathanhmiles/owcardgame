import HealthCounter from './HealthCounter';
import data from 'data';

export default function Card(props) {
  const id = props.heroId;
  const {name, health} = data.heroes[id];
  
  //TODO: make cardfocused functions - context?
  // TODO: fix img src issue - should be require(image).default
  return (
    <div id={`${name}-card`} className="card">
      <HealthCounter health={health} />
      <img src={require(`assets/heroes/${id}.png`).default} className="cardimg" alt={`${name} Card`} />
    </div>
  );
}