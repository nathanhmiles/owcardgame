import React, { useContext } from 'react';
import gameContext from 'context/gameContext';
import $ from 'jquery';
import update from 'immutability-helper';


export default function HeroAbilities(props) {
  // Context
  const { gameState, setGameState } = useContext(gameContext);

  // Variables
  const playerNum = props.playerNum;
  const playerHeroId = props.playerHeroId;
  const heroId = playerHeroId.slice(1, playerHeroId.length);
  const playerCardsId = `player${playerNum}cards`;
  const rowId = props.rowId;
  const cardFocus = props.cardFocus;
  const setCardFocus = props.setCardFocus;
  const unsetCardFocus = props.unsetCardFocus;

  // Applies the ability result to state
  function setAbilityResult(abilityResult) {
    if (abilityResult.type === "row") {
      // Apply abilities that affect a whole row

      const newState = update(gameState, {
        rows: {[abilityResult.rowId]: {
          [abilityResult.rowKey]: {$push: [abilityResult.rowValue]}
        }}});

      setGameState(newState);

    } else if (abilityResult.type === "card") {
      // Apply abilities that affect a specific card
      const targetCardId = abilityResult.targetCardId;
      const targetPlayer = targetCardId[0];
      const targetRow = abilityResult.targetRow;
      
      const newState = update(gameState, {
        playerCards: {[`player${targetPlayer}cards`]: {
          cards: {[targetCardId] :{[abilityResult.cardKey]: {$set: abilityResult.cardValue}}}
        }}
      });

      setGameState(newState);

    } else console.log(abilityResult);
  }

  function setRowSynergy(rowId, synergyCost) {
    setGameState((prevState) => ({
      ...prevState,
      rows: {
        ...prevState.rows,
        [rowId]: {
          ...prevState.rows[rowId],
          synergy: prevState.rows[rowId].synergy - synergyCost,
        },
      },
    }));
  }

  // Abilities data
  const abilities = {
    widowmaker: {
      ability1() {
        console.log('widow ability1 started')
        return new Promise((resolve, reject) => {
          $('ul').on('click', (e) => {
            
            const targetRow = e.target.id;
            console.log(targetRow);
  
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
      },
      ability2(rowSynergy) {
        console.log('widow ability2 started');
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
    },
  }

  
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
    console.log('widow ability1 started')
    return new Promise((resolve, reject) => {
      $('ul').on('click', (e) => {
        
        const targetRow = e.target.id;
        console.log(targetRow);

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
    console.log('widow ability2 started');
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

  // Hero ability functions
  async function activateAbility1(e) {
    e.stopPropagation();

    // Check that the card is not in the player's hand
    if (rowId[0] !== "p") {
      try {

        unsetCardFocus();
        
        // Call the relevant hero's ability, then set state using the result
        const abilityResult = await ability1();
        setAbilityResult(abilityResult);
      } catch (err) {
        alert(err);
      }
    } else alert("Play cards before using abilities!");
  }

  async function activateAbility2(e) {
    e.stopPropagation();

    // Check that the card is not in the player's hand
    if (rowId[0] !== "p") {
      try {
        const rowSynergy = gameState.rows[rowId].synergy;
        unsetCardFocus();

        // Call the relevant hero's ability, then set state using the result, and deduct synergy
        const abilityResult = await ability2(rowSynergy);
        setAbilityResult(abilityResult);
        setRowSynergy(rowId, abilityResult.synergyCost);
      } catch (err) {
        setCardFocus(cardFocus);
        alert(err);
      }
    } else alert("Play cards before using abilities!");
  }

  return(
    <div id="abilitiescontainer">
      <div id="ability1" className="ability ability1" onClick={activateAbility1}>

      </div>
      <div id="ability2" className="ability ability2" onClick={activateAbility2}>

      </div>
    </div>
  );
}