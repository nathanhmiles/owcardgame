import background from "assets/healthbackground-hexagon.png";

export default function HealthCounter(props) {
  const type = props.type;

  return (
    <div className={`healthcounter counter ${type}`}>
      <span className="healthvalue">{props.health}</span>
    </div>
  );
}
