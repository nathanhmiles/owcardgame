import AnaIcon from 'assets/heroes/Ana-icon.png';
import BaptisteIcon from 'assets/heroes/Baptiste-icon.png';
import BastionIcon from 'assets/heroes/Bastion-icon.png';
import BobIcon from 'assets/heroes/Bob-icon.png';
import HanzoIcon from 'assets/heroes/Hanzo-icon.png';
import LucioIcon from 'assets/heroes/Lucio-icon.png';
import MeiIcon from 'assets/heroes/Mei-icon.png';
import MercyIcon from 'assets/heroes/Mercy-icon.png';
import OrisaIcon from 'assets/heroes/Orisa-icon.png';
import WidowmakerIcon from 'assets/heroes/Widowmaker-icon.png';

import HeroCounter from 'components/layout/HeroCounter';

export default function CounterArea() {
  return(
    <div className="counterarea">
      <HeroCounter heroicon={AnaIcon} />
      <HeroCounter heroicon={BaptisteIcon} />
      <HeroCounter heroicon={BastionIcon} />
      <HeroCounter heroicon={BobIcon} />
      <HeroCounter heroicon={HanzoIcon} />
      <HeroCounter heroicon={LucioIcon} />
      <HeroCounter heroicon={MeiIcon} />
      <HeroCounter heroicon={MercyIcon} />
      <HeroCounter heroicon={OrisaIcon} />
      <HeroCounter heroicon={WidowmakerIcon} />
    </div>
  );
}