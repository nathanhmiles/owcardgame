
export default function PowerCounter(props) {
  return (
    <div className="playerarea-section">
      <div id={`player${props.playerNum}power`} className="powercounter counter">
        <span id={props.id}>
          <h4>{props.power}</h4>
        </span>
      </div>
    </div>
  );
}