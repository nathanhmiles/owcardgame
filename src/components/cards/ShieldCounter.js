export default function SynergyCounter(props) {
  const shield = props.shield;
  const type = props.type;

  return (
    <div className={`shieldcounter counter ${type}`}>
      <span><h4>{shield}</h4></span>
    </div>
  )
}