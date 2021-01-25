export default function HeroCounter(props) {
  const playerHeroId = props.playerHeroId;
  const heroId = playerHeroId.slice(1, playerHeroId.length);
  const playerNum = props.playerNum;
  const rowId = props.rowId;

  return (
    <div className="counter" onClick={() => props.setCardFocus({playerHeroId: playerHeroId, rowId: rowId})}>
      <img
        src={require(`assets/heroes/${heroId}-icon.png`).default}
        className="counter herocounter"
        alt="Hero Counter"
      />
    </div>
  );
}
