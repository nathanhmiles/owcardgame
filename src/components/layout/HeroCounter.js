export default function HealthCounter(props) {
  
  return (
    <div>
      <img src={require(`assets/heroes/${props.hero.id}-icon.png`).default} className="counter herocounter" alt="Hero Counter" />
    </div>
  );
}