export default function HealthCounter(props) {
  const id = props.heroId;
  return (
    <div className="counter">
      <img
        src={require(`assets/heroes/${id}-icon.png`).default}
        className="counter herocounter"
        alt="Hero Counter"
      />
    </div>
  );
}
