import HealthCounter from './HealthCounter';

export default function Card(props) {
  const {image, name, health, ability1, ability2} = props.hero;
  
  return (
    <div className="card">
      <HealthCounter health={health} />
      <img src={image} className="cardimg" alt="Card" />
    </div>
  );
}