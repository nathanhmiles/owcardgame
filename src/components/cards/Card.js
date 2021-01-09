import HealthCounter from './HealthCounter';

export default function Card(props) {
  const {image, name, health, ability1, ability2} = props.hero;
  
  //TODO: make cardfocused functions - context?

  return (
    <div id={`${name}-card`} className="card" draggable="true">
      <HealthCounter health={health} />
      <img src={require(`assets/heroes/${name}.png`).default} className="cardimg" alt={`${name} Card`} />
    </div>
  );
}