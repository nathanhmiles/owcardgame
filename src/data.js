// Data for all hero cards

/* hero effects API is as follows:

player: ally, enemy
  target: card, row
  type: damage, healing, synergy, power
  value: integer, double (how much more damage/healing etc to be added)
  on: turnstart, movein, moveout, attack, heal, ultimate (when does the effect take place)

*/

const data = {
  heroes: {
    
    ana: {
      id: "ana",
      name: "Ana",
      image: "assets/heroes/ana.png",
      icon: "assets/heroes/ana-icon.png",
      effect: {
        ally: {
          type: 'healing',
          target: 'row',
          value: 1,
        },
        enemy: {
          type: 'damage',
          target: 'row',
          value: 1,
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
        effect: {
          enemy: {
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
      effect: {
        ally: {
          target: 'row',
          health: 3,
          type: 'immortality',
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
      effect: {
        enemy: {
          target: 'row',
          type: 'damage',
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
      effect: {
        enemy: {
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
      effect: {
        ally: {
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
      effect: {
        enemy: {
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
      effect: {
        ally1: {
          target: 'card',
          type: 'healing',
          on: 'turnstart',
          value: 1,
        },
        ally2: {
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
      effect: {
        enemy: {
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
    },
    zenyatta: {
      id: "zenyatta",
      name: "Zenyatta",
      image: "assets/heroes/zenyatta.png",
      icon: "assets/heroes/zenyatta-icon.png",
      effect: {
        ally: {
          target: 'card',
          type: 'healing',
          on: 'turnstart',
          value: 1,
        },
        enemy: {
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
      effects: [],
      shield: 0,
    },
    '1m': {
      id: '1m',
      label: 'Middle Row',
      cardIds: [],
      synergy: 0,
      effects: [],
      shield: 0,
    },
    '1b': {
      id: '1b',
      label: 'Back Row',
      cardIds: [],
      synergy: 0,
      effects: [],
      shield: 0,
    },
    '2b': {
      id: '2b',
      label: 'Back Row',
      cardIds: [],
      synergy: 0,
      effects: [],
      shield: 0,
    },
    '2m': {
      id: '2m',
      label: 'Middle Row',
      cardIds: [],
      synergy: 0,
      effects: [],
      shield: 0,
    },
    '2f': {
      id: '2f',
      label: 'Front Row',
      cardIds: [],
      synergy: 0,
      effects: [],
      shield: 0,
    },
  }
};

export default data;
