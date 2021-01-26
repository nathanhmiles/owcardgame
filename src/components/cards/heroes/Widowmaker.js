import React, { useContext } from 'react';
import CardFace from 'components/cards/CardFace';
import gameContext from 'context/gameContext';
import $ from 'jquery';


export default function Widowmaker(props) {
  // Context
  const { gameState, setGameState } = useContext(gameContext);

  // Variables
  const playerNum = props.playerNum;
  const playerHeroId = props.playerHeroId;
  const playerCardsId = `player${playerNum}cards`;
  const rowId = props.rowId;

  
  const id = "widowmaker";
  const name = "Widowmaker";
  const image = "assets/heroes/widowmaker.png";
  const icon = "assets/heroes/widowmaker-icon.png";
  const effect = () => {};
  const health = 4;
  const power = {
    f: 2,
    m: 1,
    b: 3,
  };

  const synergy = {
    f: 2,
    m: 3,
    b: 1,
  }

  function ability1() {
    return new Promise((resolve, reject) => {
      $('ul').on('click', (e) => {
        
        const targetRow = e.target.id;
    
        const abilityResult = {
          type: 'row',
          rowId: targetRow,
          rowKey: 'effects',
          rowValue: '2widowmaker',
        };
        
        $('ul').off('click');
        if (targetRow[0] !== 'p') {
          resolve(abilityResult);
        } else {
          reject("Can't target player hand");
        }

    });
    
    }); 
  }

  function ability2(rowSynergy) {
    const synergyCost = 3;
    return new Promise((resolve, reject) => {
        if (rowSynergy >= synergyCost) {
          $('.card').on('click', (e) => {
          const targetCardId = $(e.target).closest('.card').attr('id');
          const targetRow = $(e.target).closest('.row').attr('id');
          if (targetRow[0] === 'p') {reject("Cant target player's hand")}
          const abilityResult = {
            type: 'card',
            targetCardId: targetCardId,
            cardKey: 'health',
            cardValue: 0,
            synergyCost: synergyCost,
            targetRow: targetRow,
          };

          $('.card').off('click');

            resolve(abilityResult);
          });
        } else {
          reject('Not enough synergy');
        }           
      }); 
  }

  const heroInfo = {id, name, health};

  return(
    <div 
        id={`${playerHeroId}`} 
        style={health > 0 ? null : {filter: 'grayscale(1)'}} 
        className="card" 
        onClick={() => {props.setCardFocus({playerHeroId: playerHeroId, rowId: rowId});}}
      >
        <CardFace heroInfo={heroInfo} />
      </div>
  );
}