import { RowId } from "./data.interface";

export type SetCardFocusFn = (arg: { playerHeroId: string, rowId: RowId }) => void;

export interface HeroCard {
    playerHeroId: string;
    playerNum: number;
    rowId: RowId;
    index: number;
    setCardFocus: SetCardFocusFn;
}