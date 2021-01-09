import HealthCounter from './HealthCounter';

export default function CardFocus(props) {
  const {image, name, health, ability1, ability2} = props.hero;
  
  return(
    <div id="cardfocus">
        <HealthCounter health={health} />
        <img src={require(`assets/heroes/${name}.png`).default} className="cardimg" alt={`${name} Card`} />
    </div>
  );
}