export interface HeroEffectData {
    id: string;
    hero: string;
    player: 'ally' | 'enemy';
    target: 'card' | 'row';
    type: 'damage' | 'healing' | 'attack' | 'synergy' | 'power' | 'immortality';
    value?: number | 'double' | 'allies';
    on: 'turnstart' | 'movein' | 'moveout' | 'attack' | 'heal' | 'activate' | 'ability' | 'ultimate';
    health?: number | 'synergy'; // Indicates the health value of a destroyable effect, can be a static number or based on synergy value
}

export interface HeroData {
    id: HeroId;
    name: string;
    image: string;
    icon?: string;
    isImplemented: boolean;
    health: number;
    power: {
        f: number;
        m: number;
        b: number;
    };
    synergy: {
        f: number;
        m: number;
        b: number;
    };
    effects?: {
        [effectId: string]: HeroEffectData;
    };
    zaryaShieldRemaining?: number; // Only used for Zarya, tracks remaining shield value from her passive
}

export interface PlayerCardsData {
    id: string;
    cards: {
        [playerHeroId: string]: any; // The actual card data will be generated dynamically, so we can use 'any' here
    };
}

export interface PlayerHandData {
    id: string;
    cardIds: string[]; // Array of playerHeroIds currently in the hand
    cardsPlayed: number; // Number of cards played this turn, used to determine if player can still play cards
    power: {
        f: number;
        m: number;
        b: number;
    };
    totalPower(): number; // Method to calculate total power of the hand
}

export interface RowData {
    id: string;
    label: string;
    cardIds: string[]; // Array of playerHeroIds currently in the row
    synergy: number; // Total synergy value of the row, calculated from the cards in the row
    allyEffects: HeroEffectData[]; // Array of ally effects currently active on the row
    enemyEffects: HeroEffectData[]; // Array of enemy effects currently active on the row
    shield: { source: string; shieldValue: number }[]; // Array of shield entries, each with a source and value
    totalShield(): number; // Method to calculate total shield value of the row
}

export type HeroId =
'ana' |
'ashe' |
'baptiste' |
'bastion' |
'bob' |
'brigitte' |
'doomfist' |
'dva' |
'dvameka' |
'echo' |
'genji' |
'hanzo' |
'junkrat' |
'lucio' |
'mccree' |
'mei' |
'mercy' |
'moira' |
'orisa' |
'pharah' |
'reaper' |
'reinhardt' |
'roadhog' |
'sigma' |
'soldier' |
'sombra' |
'symmetra' |
'torbjorn' |
'tracer' |
'widowmaker' |
'winston' |
'wreckingball' |
'zarya' |
'zenyatta';

export type RowId = '1b' | '1m' | '1f' | '2b' | '2m' | '2f';

export interface GameData {
    heroes: {
        [id in HeroId]: HeroData;
    },
    playerCards: {
        player1cards: PlayerCardsData;
        player2cards: PlayerCardsData;
    },
    rows: {
        player1hand: PlayerHandData;
        player2hand: PlayerHandData;
        [id in RowId]: RowData;
    };
}