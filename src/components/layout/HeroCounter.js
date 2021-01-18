export default function HeroCounter(props) {
  const playerHeroId = props.playerHeroId;
  const heroId = playerHeroId.slice(1, playerHeroId.length);
  const playerNum = props.playerNum;

  return (
    <div className="counter" onClick={() => props.setCardFocus(`${playerHeroId}`)}>
      <img
        src={require(`assets/heroes/${heroId}-icon.png`).default}
        className="counter herocounter"
        alt="Hero Counter"
      />
    </div>
  );
}
