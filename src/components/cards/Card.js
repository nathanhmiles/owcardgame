import AnaImage from '../../assets/cards/Ana.png';
import HealthCounter from './HealthCounter';

export default function Card() {
  return (
    <div id="ana">
      <HealthCounter />
      <img src={AnaImage} style={{height: '300px'}} alt="Ana Card" />
    </div>
  );
}