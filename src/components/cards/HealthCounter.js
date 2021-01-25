import background from 'assets/healthbackground-hexagon.png'

export default function HealthCounter(props) {
  return (
    <div className="healthcounter counter">
      {props.health}
    </div>
  );
}