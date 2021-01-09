import Row from 'assets/row.png';
import SynergyCounter from './SynergyCounter';
import Card from 'components/cards/Card';
import CounterArea from 'components/layout/CounterArea';

export default function CardRow(props) {
  const synergy = 0;
  const cards = false;
  
  return (
    <div className="cardrow">
      <CounterArea />
      <div className="rowlabel">{props.label}</div>
      <img src={Row} alt="" className="rowimage" />
      {cards && cards.map((card) => {return(
        <Card hero={card} />
      )})}
      <SynergyCounter synergy={synergy} />
    </div>
  );
}