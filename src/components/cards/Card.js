import HealthCounter from './HealthCounter';

export default function Card(props) {
  const {image, name, health, ability1, ability2} = props.hero;

  const discarded = false;
  
  return (
    <div id={name + "-card"} className="card" draggable="true">
      <HealthCounter health={health} />
      <img src={image} className="cardimg" alt={name + " Card"} />
    </div>
  );
}