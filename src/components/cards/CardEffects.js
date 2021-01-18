import HeroCounter from 'components/layout/HeroCounter';

export default function CardEffects(props) {
  const type = props.type;
  const effects = props.effects;

  return (
    <div className="effectscontainer">
    {effects.length > 0 ? (
      <div className={`effects ${type}effects counterarea`}>
      {effects && effects.map((heroId) => {
        return(<HeroCounter heroId={heroId} key={heroId} />);
      })}
      </div>
    ) : (null)}
    </div>
  );
}