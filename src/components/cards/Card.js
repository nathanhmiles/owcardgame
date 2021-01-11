import HealthCounter from './HealthCounter';

export default function Card(props) {
  const {id, name, image, health, ability1, ability2} = props.hero;
  
  //TODO: make cardfocused functions - context?
  // TODO: fix img src issue - should be require(image).default
  return (
    <div id={`${name}-card`} className="card">
      <HealthCounter health={health} />
      <img src={require(`assets/heroes/${id}.png`).default} className="cardimg" alt={`${name} Card`} />
    </div>
  );
}