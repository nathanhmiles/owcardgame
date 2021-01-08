import HealthCounter from './HealthCounter';

export default function Card(props) {
  const {image, name, ability1, ability2} = props.hero;
  
  return (
    <div className="card" onMouseOver="">
      <HealthCounter />
      <img src={image} className="cardimg" alt="Card" />
    </div>
  );
}