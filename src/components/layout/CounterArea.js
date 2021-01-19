import React, { useContext } from 'react';
import gameContext from 'context/gameContext';
import HeroCounter from 'components/layout/HeroCounter';

export default function CounterArea(props) {
  const { gameState } = useContext(gameContext);
  const type = props.type;
  const rowId = props.rowId;
  
  // Create icons array and store ids of hero with icons inside
  const effects = gameState.rows[rowId].effects;
  
  return(
    <div className={`${type}-counterarea counterarea`}>
      {effects && effects.map((playerHeroId) => {
          return (
            <HeroCounter 
              playerHeroId={playerHeroId} 
              key={playerHeroId} 
              setCardFocus={props.setCardFocus} 
              playerNum={props.playerNum}
            />
          );
      })}
    </div>
  );
};