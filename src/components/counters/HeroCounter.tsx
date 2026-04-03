import React from "react";
import {HeroCard} from "../../types/hero-card.interface";

export default function HeroCounter(props: HeroCard) {
    const playerHeroId = props.playerHeroId;
    const heroId = props.heroId;
    const playerNum = props.playerNum;
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
