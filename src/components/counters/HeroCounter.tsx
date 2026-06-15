import React from "react";
import {HeroCard, SetCardFocusFn} from "../../types/hero-card.interface";
import {RowId} from "../../types/data.interface";

interface HeroCounterProps {
    playerHeroId: string;
    heroId: string;
    rowId: RowId;
    health: number;
    setCardFocus: SetCardFocusFn;
}

export default function HeroCounter(props: HeroCounterProps) {
    const playerHeroId = props.playerHeroId;
    const heroId = props.heroId;
    const rowId = props.rowId;
    const health = props.health;

    return (
        <div
            className='counter'
            onClick={() =>
                props.setCardFocus({ playerHeroId: playerHeroId, rowId: rowId })
            }
        >
            <img
                src={require(`assets/heroes/cards/${heroId}-icon.webp`).default}
                className='counter herocounter'
                alt='Hero Counter'
            />
            {health && (
                <span className='herocounterhealth'>
                    <h4>{health}</h4>
                </span>
            )}
        </div>
    );
}
