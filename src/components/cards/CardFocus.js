import HealthCounter from './HealthCounter';

export default function CardFocus(props) {
  
  const id = props.heroId;
  // <HealthCounter health={health} />
  
  return(
    <div id="cardfocuscontainer">
      <div id="cardfocus" onClick={props.unsetCardFocus}>
          <img 
            src={require(`assets/heroes/${id}.png`).default} 
            className="cardimg" 
            alt={'Card Focus'} 
          />
      </div>
    </div>
  );
}