import background from 'assets/healthbackground.png'

export default function HealthCounter(props) {
  return (
    <div className="healthcounter">
      {props.health}
    </div>
  );
}