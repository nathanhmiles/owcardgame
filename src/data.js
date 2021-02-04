// Data for all hero cards

/* hero effects API is as follows:

player: ally, enemy
  target: 
    card, 
    row
  type: 
    damage,  //affects hero damage
    attack,  // attacks enemy when triggered 
    healing, 
    synergy, 
    power
  value:      // how much more damage/healing etc to be added
    integer, 
    double, 
    allies,   // proportionate to the number of allies, usually in a given row
  on:         // when does the effect take place
    turnstart, 
    movein, 
    moveout, 
    attack, 
    heal, 
    activate, // effect triggers once when ability is activated, never again 
    ability,  // usage of any of a card's abilities
    ultimate,  // usage of a card's ultimate ability

*/

const data = {
  heroes: {
    
    ana: {
      id: "ana",
      name: "Ana",
      image: "assets/heroes/ana.png",
      icon: "assets/heroes/ana-icon.png",
      effects: {
        anaAllyEffect: {
          id: 'anaAllyEffect',
          hero: 'ana',
          player: 'ally',
          type: 'healing',
          target: 'row',
          on: 'heal',
          value: 1,
        },
        anaEnemy: {
          id: 'anaEnemyEffect',
          hero: 'ana',
          player: 'enemy',
          type: 'damage',
          target: 'row',
          on: 'attack',
          value: 1,
        },
        anaUltimateEffect: {
          id: 'anaUltimateEffect',
          hero: 'ana',
          player: 'ally',
          target: 'row',
          type: 'power',
          on: 'activate',
          value: 'allies',
        },
      },
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
      bob: {
        id: "bob",
        name: "Bob",
        image: "assets/heroes/bob.png",
        icon: "assets/heroes/bob-icon.png",
        effects: {
          bobEnemyEffect: {
            id: 'bobEnemyEffect',
            hero: 'bob',
            player: 'enemy',
            target: 'row',
            type: 'synergy',
            on: 'ultimate',
            value: 2,
          },
        },
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
      },
    },

    baptiste: {
      id: "baptiste",
      name: "Baptiste",
      image: "assets/heroes/baptiste.png",
      icon: "assets/heroes/baptiste-icon.png",
      effects: {
        baptisteAllyEffect: {
          id: 'baptisteAllyEffect',
          hero: 'baptiste',
          player: 'ally',
          target: 'row',
          health: 3,
          type: 'immortality',
          on: 'activate',
        },
      },
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
    },

    bastion: {
      id: "bastion",
      name: "Bastion",
      image: "assets/heroes/bastion.png",
      icon: "assets/heroes/bastion-icon.png",
      effects: {
        bastionEnemyEffect: {
          id: 'bastionEnemyEffect',
          hero: 'bastion',
          player: 'enemy',
          target: 'row',
          type: 'attack',
          value: 2,
          on: 'movein'
        },
      },
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
      },
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
    },
    hanzo: {
      id: "hanzo",
      name: "Hanzo",
      image: "assets/heroes/hanzo.png",
      icon: "assets/heroes/hanzo-icon.png",
      effects: {
        hanzoEnemyEffect: {
          id: 'hanzoEnemyEffect',
          hero: 'hanzo',
          player: 'enemy',
          target: 'row',
          type: 'damage',
          on: 'attack',
          value: 1,
        },
      },
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
    },
    lucio: {
      id: "lucio",
      name: "Lucio",
      image: "assets/heroes/lucio.png",
      icon: "assets/heroes/lucio-icon.png",
      effects: {
        lucioAllyEffect: {
          id: 'lucioAllyEffect',
          hero: 'lucio',
          player: 'ally',
          target: 'row',
          type: 'healing',
          on: 'turnstart',
          value: 1,
        },
      },
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
    },
    mei: {
      id: "mei",
      name: "Mei",
      image: "assets/heroes/mei.png",
      icon: "assets/heroes/mei-icon.png",
      effects: {
        meiEnemyEffect: {
          id: 'meiEnemyEffect',
          hero: 'mei',
          player: 'enemy',
          target: 'row',
          type: 'synergy',
          value: 'double',
          on: 'ultimate',
        },
      },
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
    },
    mercy: {
      id: "mercy",
      name: "Mercy",
      image: "assets/heroes/mercy.png",
      icon: "assets/heroes/mercy-icon.png",
      effects: {
        mercyAllyEffect1: {
          id: 'mercyAllyEffect1',
          hero: 'mercy',
          player: 'ally',
          target: 'card',
          type: 'healing',
          on: 'turnstart',
          value: 1,
        },
        mercyAllyEffect2: {
          id: 'mercyAllyEffect2',
          hero: 'mercy',
          player: 'ally',
          target: 'card',
          type: 'damage',
          value: 1,
          on: 'attack',
        },
      },
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
    },
    orisa: {
      id: "orisa",
      name: "Orisa",
      image: "assets/heroes/orisa.png",
      icon: "assets/heroes/orisa-icon.png",
      effects: {
        orisaAllyEffect: {
          id: 'orisaAllyEffect',
          hero: 'orisa',
          player: 'ally',
          target: 'row',
          type: 'damage',
          on: 'attack',
          value: -1,
        },
        orisaUltimateEffect: {
          id: 'orisaUltimateEffect',
          hero: 'orisa',
          player: 'ally',
          target: 'row',
          type: 'power',
          on: 'activate',
          value: 'allies',
        },
      },
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
    },
    sigma: {
      id: "sigma",
      name: "Sigma",
      image: "assets/heroes/sigma.png",
      icon: "assets/heroes/sigma-icon.png",
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
    },
    torbjorn: {
      id: "torbjorn",
      name: "Torbjorn",
      image: "assets/heroes/torbjorn.png",
      icon: "assets/heroes/torbjorn-icon.png",
      effects: {
        torbjornEnemyEffect: {
          id: 'torbjornEnemyEffect',
          hero: 'torbjorn',
          player: 'enemy',
          target: 'row',
          type: 'attack',
          on: 'turnstart',
          value: 1,
        },
      },
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
    },
    widowmaker: {
      id: "widowmaker",
      name: "Widowmaker",
      image: "assets/heroes/widowmaker.png",
      icon: "assets/heroes/widowmaker-icon.png",
      effects: {
        widowmakerEnemyEffect: {
          id: 'widowmakerEnemyEffect',
          hero: 'widowmaker',
          player: 'enemy',
          target: 'row',
          type: 'damage',
          on: 'attack',
          value: 1,
        },
      },
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
    },
    wreckingball: {
      id: "wreckingball",
      name: "Wrecking Ball",
      image: "assets/heroes/wreckingball.png",
      icon: "assets/heroes/wreckingball-icon.png",
      effects: {
        wreckingballEnemyEffect: {
          id: 'wreckingballEnemyEffect',
          hero: 'wreckingball',
          player: 'enemy',
          target: 'row',
          type: 'attack',
          value: 2,
          on: 'ability',
          health: 'synergy',
        },
      },
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
    },
    zarya: {
      id: "zarya",
      name: "Zarya",
      image: "assets/heroes/zarya.png",
      icon: "assets/heroes/zarya-icon.png",
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
    },
    zenyatta: {
      id: "zenyatta",
      name: "Zenyatta",
      image: "assets/heroes/zenyatta.png",
      icon: "assets/heroes/zenyatta-icon.png",
      effects: {
        zenyattaAllyEffect: {
          id: 'zenyattaAllyEffect',
          hero: 'zenyatta',
          player: 'ally',
          target: 'card',
          type: 'healing',
          on: 'turnstart',
          value: 1,
        },
        zenyattaEnemyEffect: {
          id: 'zenyattaEnemyEffect',
          hero: 'zenyatta',
          player: 'enemy',
          target: 'card',
          type: 'damage',
          on: 'attack',
          value: 1,
        },
      },
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
      allyEffects: [],
      enemyEffects: [],
      shield: 0,
    },
    '1m': {
      id: '1m',
      label: 'Middle Row',
      cardIds: [],
      synergy: 0,
      allyEffects: [],
      enemyEffects: [],
      shield: 0,
    },
    '1b': {
      id: '1b',
      label: 'Back Row',
      cardIds: [],
      synergy: 0,
      allyEffects: [],
      enemyEffects: [],
      shield: 0,
    },
    '2b': {
      id: '2b',
      label: 'Back Row',
      cardIds: [],
      synergy: 0,
      allyEffects: [],
      enemyEffects: [],
      shield: 0,
    },
    '2m': {
      id: '2m',
      label: 'Middle Row',
      cardIds: [],
      synergy: 0,
      allyEffects: [],
      enemyEffects: [],
      shield: 0,
    },
    '2f': {
      id: '2f',
      label: 'Front Row',
      cardIds: [],
      synergy: 0,
      allyEffects: [],
      enemyEffects: [],
      shield: 0,
    },
  }
};

export default data;
