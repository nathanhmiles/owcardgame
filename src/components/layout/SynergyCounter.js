
export default function SynergyCounter(props) {

  return (
    <div className="synergycounter counter">
      <span id={props.id}><h4>{props.synergy}</h4></span>
    </div>
  )
}