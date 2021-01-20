import helper from 'helper';
import $ from 'jquery';

// Data for all hero cards
const data = {
  heroes: {
    ana: {
      id: "ana",
      name: "Ana",
      image: "assets/heroes/ana.png",
      icon: "assets/heroes/ana-icon.png",
      effect: () => {},
      health: 4,
      power: {
        f: 1,
        m: 2,
        b: 2,
      },
      synergy: {
        f: 3,
        m: 2,
        b: 2,
      },
      ability1: () => {},
      ability2: () => {},
    },
    ashe: {
      id: "ashe",
      name: "Ashe",
      image: "assets/heroes/ashe.png",
      health: 3,
      power: {
        f: 2,
        m: 1,
        b: 3,
      },
      synergy: {
        f: 2,
        m: 3,
        b: 1,
      },
      ability1: () => {},
      ability2: () => {},
    },
    baptiste: {
      id: "baptiste",
      name: "Baptiste",
      image: "assets/heroes/baptiste.png",
      icon: "assets/heroes/baptiste-icon.png",
      effect: () => {},
      health: 4,
      power: {
        f: 3,
        m: 2,
        b: 1,
      },
      synergy: {
        f: 1,
        m: 2,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    bastion: {
      id: "bastion",
      name: "Bastion",
      image: "assets/heroes/bastion.png",
      icon: "assets/heroes/bastion-icon.png",
      effect: () => {},
      health: 5,
      power: {
        f: 1,
        m: 2,
        b: 3,
      },
      synergy: {
        f: 3,
        m: 2,
        b: 1,
      },
      ability1: () => {},
      ability2: () => {},
    },
    bob: {
      id: "bob",
      name: "Bob",
      image: "assets/heroes/bob.png",
      icon: "assets/heroes/bob-icon.png",
      effect: () => {},
      health: 3,
      power: {
        f: 1,
        m: 1,
        b: 1,
      },
      synergy: {
        f: 0,
        m: 0,
        b: 0,
      },
      ability1: () => {},
      ability2: () => {},
    },
    brigitte: {
      id: "brigitte",
      name: "Brigitte",
      image: "assets/heroes/brigitte.png",
      health: 4,
      power: {
        f: 3,
        m: 2,
        b: 1,
      },
      synergy: {
        f: 1,
        m: 2,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    doomfist: {
      id: "doomfist",
      name: "Doomfist",
      image: "assets/heroes/doomfist.png",
      health: 4,
      power: {
        f: 3,
        m: 2,
        b: 1,
      },
      synergy: {
        f: 1,
        m: 2,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    dva: {
      id: "dva",
      name: "D.va",
      image: "assets/heroes/dva.png",
      health: 2,
      power: {
        f: 1,
        m: 1,
        b: 1,
      },
      synergy: {
        f: 0,
        m: 0,
        b: 0,
      },
      ability1: () => {},
      ability2: () => {},
    },
    dvameka: {
      id: "dvameka",
      name: "D.va + Meka",
      image: "assets/heroes/dvameka.png",
      health: 4,
      power: {
        f: 2,
        m: 3,
        b: 1,
      },
      synergy: {
        f: 2,
        m: 1,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    echo: {
      id: "echo",
      name: "Echo",
      image: "assets/heroes/echo.png",
      health: 4,
      power: {
        f: 1,
        m: 3,
        b: 2,
      },
      synergy: {
        f: 3,
        m: 1,
        b: 2,
      },
      ability1: () => {},
      ability2: () => {},
    },
    genji: {
      id: "genji",
      name: "Genji",
      image: "assets/heroes/genji.png",
      health: 4,
      power: {
        f: 3,
        m: 2,
        b: 1,
      },
      synergy: {
        f: 1,
        m: 2,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    hanzo: {
      id: "hanzo",
      name: "Hanzo",
      image: "assets/heroes/hanzo.png",
      icon: "assets/heroes/hanzo-icon.png",
      effect: () => {},
      health: 4,
      power: {
        f: 1,
        m: 3,
        b: 2,
      },
      synergy: {
        f: 3,
        m: 1,
        b: 2,
      },
      ability1: () => {},
      ability2: () => {},
    },
    junkrat: {
      id: "junkrat",
      name: "Junkrat",
      image: "assets/heroes/junkrat.png",
      health: 3,
      power: {
        f: 3,
        m: 2,
        b: 1,
      },
      synergy: {
        f: 1,
        m: 2,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    lucio: {
      id: "lucio",
      name: "Lucio",
      image: "assets/heroes/lucio.png",
      icon: "assets/heroes/lucio-icon.png",
      effect: () => {},
      health: 3,
      power: {
        f: 2,
        m: 1,
        b: 2,
      },
      synergy: {
        f: 2,
        m: 3,
        b: 2,
      },
      ability1: () => {},
      ability2: () => {},
    },
    mccree: {
      id: "mccree",
      name: "McCree",
      image: "assets/heroes/mccree.png",
      health: 4,
      power: {
        f: 2,
        m: 3,
        b: 1,
      },
      synergy: {
        f: 2,
        m: 1,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    mei: {
      id: "mei",
      name: "Mei",
      image: "assets/heroes/mei.png",
      icon: "assets/heroes/mei-icon.png",
      effect: () => {},
      health: 4,
      power: {
        f: 2,
        m: 3,
        b: 1,
      },
      synergy: {
        f: 2,
        m: 1,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    mercy: {
      id: "mercy",
      name: "Mercy",
      image: "assets/heroes/mercy.png",
      icon: "assets/heroes/mercy-icon.png",
      effect: () => {},
      health: 3,
      power: {
        f: 1,
        m: 2,
        b: 2,
      },
      synergy: {
        f: 3,
        m: 2,
        b: 2,
      },
      ability1: () => {},
      ability2: () => {},
    },
    moira: {
      id: "moira",
      name: "Moira",
      image: "assets/heroes/moira.png",
      health: 3,
      power: {
        f: 2,
        m: 1,
        b: 2,
      },
      synergy: {
        f: 2,
        m: 3,
        b: 2,
      },
      ability1: () => {},
      ability2: () => {},
    },
    orisa: {
      id: "orisa",
      name: "Orisa",
      image: "assets/heroes/orisa.png",
      icon: "assets/heroes/orisa-icon.png",
      effect: () => {},
      health: 5,
      power: {
        f: 1,
        m: 2,
        b: 3,
      },
      synergy: {
        f: 3,
        m: 2,
        b: 1,
      },
      ability1: () => {},
      ability2: () => {},
    },
    pharah: {
      id: "pharah",
      name: "Pharah",
      image: "assets/heroes/pharah.png",
      health: 4,
      power: {
        f: 1,
        m: 3,
        b: 2,
      },
      synergy: {
        f: 3,
        m: 1,
        b: 2,
      },
      ability1: () => {},
      ability2: () => {},
    },
    reaper: {
      id: "reaper",
      name: "Reaper",
      image: "assets/heroes/reaper.png",
      health: 4,
      power: {
        f: 2,
        m: 1,
        b: 3,
      },
      synergy: {
        f: 2,
        m: 3,
        b: 1,
      },
      ability1: () => {},
      ability2: () => {},
    },
    reinhardt: {
      id: "reinhardt",
      name: "Reinhardt",
      image: "assets/heroes/reinhardt.png",
      health: 4,
      power: {
        f: 3,
        m: 2,
        b: 1,
      },
      synergy: {
        f: 1,
        m: 2,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    roadhog: {
      id: "roadhog",
      name: "Roadhog",
      image: "assets/heroes/roadhog.png",
      health: 5,
      power: {
        f: 3,
        m: 2,
        b: 1,
      },
      synergy: {
        f: 1,
        m: 2,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    sigma: {
      id: "sigma",
      name: "Sigma",
      image: "assets/heroes/sigma.png",
      icon: "assets/heroes/sigma-icon.png",
      effect: () => {},
      health: 4,
      power: {
        f: 1,
        m: 3,
        b: 2,
      },
      synergy: {
        f: 3,
        m: 1,
        b: 2,
      },
      ability1: () => {},
      ability2: () => {},
    },
    soldier: {
      id: "soldier",
      name: "Soldier 76",
      image: "assets/heroes/soldier.png",
      health: 4,
      power: {
        f: 2,
        m: 3,
        b: 1,
      },
      synergy: {
        f: 2,
        m: 1,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    sombra: {
      id: "sombra",
      name: "Sombra",
      image: "assets/heroes/sombra.png",
      health: 4,
      power: {
        f: 3,
        m: 1,
        b: 2,
      },
      synergy: {
        f: 1,
        m: 3,
        b: 2,
      },
      ability1: () => {},
      ability2: () => {},
    },
    symmetra: {
      id: "symmetra",
      name: "Symmetra",
      image: "assets/heroes/symmetra.png",
      health: 3,
      power: {
        f: 2,
        m: 1,
        b: 2,
      },
      synergy: {
        f: 2,
        m: 3,
        b: 2,
      },
      ability1: () => {},
      ability2: () => {},
    },
    torbjorn: {
      id: "torbjorn",
      name: "Torbjorn",
      image: "assets/heroes/torbjorn.png",
      icon: "assets/heroes/torbjorn-icon.png",
      effect: () => {},
      health: 4,
      power: {
        f: 3,
        m: 1,
        b: 2,
      },
      synergy: {
        f: 1,
        m: 3,
        b: 2,
      },
      ability1: () => {},
      ability2: () => {},
    },
    tracer: {
      id: "tracer",
      name: "Tracer",
      image: "assets/heroes/tracer.png",
      health: 3,
      power: {
        f: 3,
        m: 2,
        b: 1,
      },
      synergy: {
        f: 1,
        m: 2,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    widowmaker: {
      id: "widowmaker",
      name: "Widowmaker",
      image: "assets/heroes/widowmaker.png",
      icon: "assets/heroes/widowmaker-icon.png",
      effect: () => {},
      health: 4,
      power: {
        f: 2,
        m: 1,
        b: 3,
      },
      synergy: {
        f: 2,
        m: 3,
        b: 1,
      },
      ability1() {
        console.log('widow ability1 started')
        return new Promise((resolve, reject) => {
          $('.rowarea').on('click', (e) => {
            
            const targetRow = e.target.id;
            console.log(targetRow);
  
            const abilityResult = {
              type: 'row',
              rowId: targetRow,
              rowKey: 'effects',
              rowValue: '2widowmaker',
            };
            
            $('.rowarea').off('click');
            if (targetRow) {
              resolve(abilityResult);
            } else {
              reject('Error with widow ability1');
            }

        });
        
        });

        
      },
      ability2() {
        console.log('widow ability2 started');
        
        return new Promise((resolve, reject) => {
          $('.card').on('click', (e) => {
            const targetCard = e.target.parentElement.id;
            
            const abilityResult = {
              type: 'card',
              playerHeroId: targetCard,
              cardKey: 'health',
              cardValue: 0,
            };

            $('.card').off('click');

            if (targetCard) {
              resolve(abilityResult);
            } else {
              reject('Error with widow ability2');
            }

          });
        });
      },
    },
    winston: {
      id: "winston",
      name: "Winston",
      image: "assets/heroes/winston.png",
      health: 4,
      power: {
        f: 3,
        m: 2,
        b: 1,
      },
      synergy: {
        f: 1,
        m: 2,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    wreckingball: {
      id: "wreckingball",
      name: "Wrecking Ball",
      image: "assets/heroes/wreckingball.png",
      icon: "assets/heroes/wreckingball-icon.png",
      effect: () => {},
      health: 3,
      power: {
        f: 2,
        m: 3,
        b: 1,
      },
      synergy: {
        f: 2,
        m: 1,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    zarya: {
      id: "zarya",
      name: "Zarya",
      image: "assets/heroes/zarya.png",
      icon: "assets/heroes/zarya-icon.png",
      effect: () => {},
      health: 4,
      power: {
        f: 2,
        m: 3,
        b: 1,
      },
      synergy: {
        f: 2,
        m: 1,
        b: 3,
      },
      ability1: () => {},
      ability2: () => {},
    },
    zenyatta: {
      id: "zenyatta",
      name: "Zenyatta",
      image: "assets/heroes/zenyatta.png",
      icon: "assets/heroes/zenyatta-icon.png",
      effect: () => {},
      health: 4,
      power: {
        f: 2,
        m: 2,
        b: 1,
      },
      synergy: {
        f: 2,
        m: 2,
        b: 3,
      },
      ability1: () => {
        console.log('zen ability1')
      },
      ability2: () => {
        console.log('zen ability2')
      },
    },
  },
  playerCards: {
    'player1cards' :{
      id: 'player1cards',
      cards: {}
    },
    'player2cards': {
      id: 'player2cards',
      cards: {}
    }
  },
  rows: {
    'player1hand': {
      id: 'player1hand',
      cardIds: [],
      power: {
        f: 0,
        m: 0,
        b: 0,
      },
    },
    'player2hand': {
      id: 'player2hand',
      cardIds: [],
      power: {
        f: 0,
        m: 0,
        b: 0,
      },
    },
    '1f': {
      id: '1f',
      label: 'Front Row',
      cardIds: [],
      synergy: 0,
      effects: [],
    },
    '1m': {
      id: '1m',
      label: 'Middle Row',
      cardIds: [],
      synergy: 0,
      effects: [],
    },
    '1b': {
      id: '1b',
      label: 'Back Row',
      cardIds: [],
      synergy: 0,
      effects: [],
    },
    '2b': {
      id: '2b',
      label: 'Back Row',
      cardIds: [],
      synergy: 0,
      effects: [],
    },
    '2m': {
      id: '2m',
      label: 'Middle Row',
      cardIds: [],
      synergy: 0,
      effects: [],
    },
    '2f': {
      id: '2f',
      label: 'Front Row',
      cardIds: [],
      synergy: 0,
      effects: [],
    },
  }
};

export default data;
