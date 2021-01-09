
// Data for all hero cards
// hero.location options are: "deck", "hand", rowId (e.g. "2m"), "discarded"
// TODO: create test to ensure no cards have anything other than the above values as location
const Heroes = {
  Ana: {
    name: "Ana",
    image: "assets/heroes/Ana.png",
    icon: "assets/heroes/Ana-icon.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Ashe: {
    name: "Ashe",
    image: "assets/heroes/Ashe.png",
    health: 3,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Baptiste: {
    name: "Baptiste",
    image: "assets/heroes/Baptiste.png",
    icon: "assets/heroes/Baptiste-icon.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Bastion: {
    name: "Bastion",
    image: "assets/heroes/Bastion.png",
    icon: "assets/heroes/Bastion-icon.png",
    health: 5,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Bob: {
    name: "Bob",
    image: "assets/heroes/Bob.png",
    icon: "assets/heroes/Bob-icon.png",
    health: 3,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Brigitte: {
    name: "Brigitte",
    image: "assets/heroes/Brigitte.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Doomfist: {
    name: "Doomfist",
    image: "assets/heroes/Doomfist.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  DvaMeka: {
    name: "DvaMeka",
    image: "assets/heroes/DvaMeka.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Dva: {
    image: "assets/heroes/Dva.png",
    name: "Dva",
    health: 2,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Echo: {
    image: "assets/heroes/Echo.png",
    name: "Echo",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Genji: {
    image: "assets/heroes/Genji.png",
    name: "Genji",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Hanzo: {
    name: "Hanzo",
    image: "assets/heroes/Hanzo.png",
    icon: "assets/heroes/Hanzo-icon.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Junkrat: {
    name: "Junkrat",
    image: "assets/heroes/Junkrat.png",
    health: 3,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Lucio: {
    name: "Lucio",
    image: "assets/heroes/Lucio.png",
    icon: "assets/heroes/Lucio-icon.png",
    health: 3,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  McCree: {
    name: "McCree",
    image: "assets/heroes/McCree.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Mei: {
    name: "Mei",
    image: "assets/heroes/Mei.png",
    icon: "assets/heroes/Mei-icon.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Mercy: {
    name: "Mercy",
    image: "assets/heroes/Mercy.png",
    icon: "assets/heroes/Mercy-icon.png",
    health: 3,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Moira: {
    name: "Moira",
    image: "assets/heroes/Moira.png",
    health: 3,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Orisa: {
    name: "Orisa",
    image: "assets/heroes/Orisa.png",
    icon: "assets/heroes/Orisa-icon.png",
    health: 5,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Pharah: {
    name: "Pharah",
    image: "assets/heroes/Pharah.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Reaper: {
    name: "Reaper",
    image: "assets/heroes/Reaper.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Reinhardt: {
    name: "Reinhardt",
    image: "assets/heroes/Reinhardt.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Roadhog: {
    name: "Roadhog",
    image: "assets/heroes/Roadhog.png",
    health: 5,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Sigma: {
    name: "Sigma",
    image: "assets/heroes/Sigma.png",
    icon: "assets/heroes/Sigma-icon.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Soldier: {
    name: "Soldier",
    image: "assets/heroes/Soldier.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Sombra: {
    name: "Sombra",
    image: "assets/heroes/Sombra.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Symmetra: {
    name: "Symmetra",
    image: "assets/heroes/Symmetra.png",
    health: 3,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Torbjorn: {
    name: "Torbjorn",
    image: "assets/heroes/Torbjorn.png",
    icon: "assets/heroes/Torbjorn-icon.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Tracer: {
    name: "Tracer",
    image: "assets/heroes/Tracer.png",
    health: 3,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Widowmaker: {
    name: "Widowmaker",
    image: "assets/heroes/Widowmaker.png",
    icon: "assets/heroes/Widowmaker-icon.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Winston: {
    name: "Winston",
    image: "assets/heroes/Winston.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  WreckingBall: {
    name: "WreckingBall",
    image: "assets/heroes/WreckingBall.png",
    icon: "assets/heroes/WreckingBall-icon.png",
    health: 3,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Zarya: {
    name: "Zarya",
    image: "assets/heroes/Zarya.png",
    icon: "assets/heroes/Zarya-icon.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
  Zenyatta: {
    name: "Zenyatta",
    image: "assets/heroes/Zenyatta.png",
    icon: "assets/heroes/Zenyatta-icon.png",
    health: 4,
    ability1: () => {},
    ability2: () => {},
    player1location: "deck",
    player2location: "deck",
  },
};

export default Heroes;
