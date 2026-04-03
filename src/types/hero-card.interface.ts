import { SetCardFocusFn } from './card.types';

export interface HeroCard {
    playerHeroId: string;
    playerNum: number;
    rowId: string[];
    index: number;
    setCardFocus: SetCardFocusFn;
}