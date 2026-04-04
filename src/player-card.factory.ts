import data from './data';
import {HeroData, HeroEffectData, HeroId} from "./types/data.interface";

// Creates a card with its own health and id unique to the playerCard, returns player-specific ID
export class PlayerCard {
    public playerNum: 1 | 2;
    public heroId: HeroId;

    public heroData: HeroData;

    public maxHealth: number;
    public playerHeroId: string;
    public shield = 0;
    public effects?: HeroEffectData;
    public enemyEffects = [];
    public allyEffects = [];
    public ability1Used = false;
    public ability2Used = false;
    public isPlayed: boolean;
    public isDiscarded = false;

    constructor(playerNum: 1 | 2, heroId: HeroId) {
        this.playerNum = playerNum;
        this.heroId = heroId;

        this.heroData = data.heroes[heroId];
        this.maxHealth = this.heroData.health;
        this.playerHeroId = `${this.playerNum}${this.heroId}`;
        this.isPlayed = this.heroId === 'dva' ? true : false;

        // Add hero effects to card, and insert playerHeroId for future use
        if ('effects' in this.heroData) {
            this.effects = this.copyEffects();
        }
    }

    private copyEffects(): HeroEffectData {
        let effects = JSON.parse(JSON.stringify(this.heroData.effects));
        for (let key in effects) {
            effects[key]['playerHeroId'] = this.playerHeroId;
        }
        return effects;
    }

}