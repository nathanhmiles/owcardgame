import React from 'react';
import HeroCounter from '../counters/HeroCounter';
import {Effect} from "../../types/effect.interface";
import {RowId} from "../../types/data.interface";
import {SetCardFocusFn} from "../../types/hero-card.interface";

interface CardEffectsProps {
    type: string;
    effects: Effect[];
    rowId: RowId;
    setCardFocus: SetCardFocusFn;
}

export default function CardEffects(props: CardEffectsProps) {
    const { type, effects } = props;

    return (
        <div className={`effectscontainer ${type}effects`}>
            {effects.length > 0 ? (
                <div className={`effects counterarea`}>
                    {effects.map((effect) => {
                            return (
                                <HeroCounter
                                    heroId={effect.hero}
                                    rowId={props.rowId}
                                    key={effect.hero}
                                    playerHeroId={effect.playerHeroId}
                                    health={effect.health}
                                    setCardFocus={props.setCardFocus}
                                />
                            );
                        })}
                </div>
            ) : null}
        </div>
    );
}
