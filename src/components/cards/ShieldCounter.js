export default function SynergyCounter(props) {
  const shield = props.shield;
  const type = props.type;

  console.log('shieldcounter rendered')
  return (
    <div className={`shieldcounter counter ${type}`}>
      <span><h4>{props.shield}</h4></span>
    </div>
  )
}