import Row from '../../assets/row.png';
import RowCard from '../../assets/cards/row-card.png';

export default function Cardrow() {
  return (
    <div>
      <img src={RowCard} alt="" style={{height: '200px'}} />
      <img src={Row} alt="" style={{height: '200px'}} />
    </div>
  );
}