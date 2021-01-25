import background from 'assets/healthbackground.png'

export default function HealthCounter(props) {
  const type = props.type;

  return (
    <div className={`healthcounter counter ${type}`}>
      {props.health}
    </div>
  );
}