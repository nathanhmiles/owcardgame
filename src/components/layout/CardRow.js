import Row from '../../assets/row.png';
import SynergyCounter from './SynergyCounter';
import Card from '../cards/Card';

export default function CardRow() {
  const synergy = 0;
  const cards = false;
  
  return (
    <div className="cardrow">
      <img src={Row} alt="" style={{height: '220px'}} />
      {cards && cards.map((card) => {return(
        <Card hero={card} />
      )})}
      <SynergyCounter synergy={synergy} />
    </div>
  );
}