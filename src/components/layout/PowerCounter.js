
export default function PowerCounter(props) {
  return (
    <div className="powercounter counter">
      <span id={props.id}><h4>{props.power}</h4></span>
    </div>
  );
}