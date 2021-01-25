
export default function SynergyCounter(props) {
  const shieldValue = props.shieldValue;
  const type = props.type;
  return (
    <div className={`shieldcounter counter ${type}`}>
      <span><h4>{shieldValue}</h4></span>
    </div>
  )
}