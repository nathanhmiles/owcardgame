import data from './data';
import {HeroData, HeroEffectData, HeroId} from "./types/data.interface";

// Creates a card with its own health and id unique to the playerCard, returns player-specific ID
export class PlayerCard {
    public playerNum: 1 | 2;
    public heroId: HeroId;

    public heroData: HeroData = { ...data.heroes[this.heroId] };

    public maxHealth = this.heroData.health;
    public playerHeroId = `${this.playerNum}${this.heroId}`;
    public shield = 0;
    public effects?: HeroEffectData;
    public enemyEffects = [];
    public allyEffects = [];
    public ability1Used = false;
    public ability2Used = false;
    public isPlayed = this.heroId === 'dva' ? true : false;
    public isDiscarded = false;

    constructor(playerNum: 1 | 2, heroId: HeroId) {
        this.playerNum = playerNum;
        this.heroId = heroId;

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