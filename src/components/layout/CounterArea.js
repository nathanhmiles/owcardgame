import React, { useContext } from 'react';
import gameContext from 'context/gameContext';
import HeroCounter from 'components/counters/HeroCounter';

export default function CounterArea(props) {
    const { gameState } = useContext(gameContext);
    const type = props.type;
    const rowId = props.rowId;

    // Create icons array and store ids of hero with icons inside
    const effects = [
        ...gameState.rows[rowId].allyEffects,
        ...gameState.rows[rowId].enemyEffects,
    ];

    return (
        <div className={`${type}-counterarea counterarea`}>
            {effects &&
                effects.map((effect) => {
                    return (
                        <HeroCounter
                            playerHeroId={effect.playerHeroId}
                            heroId={effect.hero}
                            key={effect.playerHeroId}
                            setCardFocus={props.setCardFocus}
                            playerNum={props.playerNum}
                            rowId={rowId}
                            health={effect.health}
                        />
                    );
                })}
        </div>
    );
}
