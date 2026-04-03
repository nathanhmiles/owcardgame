import React from 'react';
import HeroCounter from '../counters/HeroCounter';
import {Effect} from "../../types/effect.interface";

export default function CardEffects(props: {
    type: string;
    effects: Effect[];
    setCardFocus: () => void;
}) {
    const { type, effects } = props;

    return (
        <div className={`effectscontainer ${type}effects`}>
            {effects.length > 0 ? (
                <div className={`effects counterarea`}>
                    {effects &&
                        effects.map((effect) => {
                            return (
                                <HeroCounter
                                    heroId={effect.hero}
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
