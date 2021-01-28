import React, { useContext } from "react";
import gameContext from "context/gameContext";
import turnContext from "context/turnContext";
import $ from "jquery";
import helper from 'helper';

export default function HeroAbilities(props) {
  // Context
  const { gameState, setGameState } = useContext(gameContext);
  const { turnState, setTurnState } = useContext(turnContext);

  // Variables
  const playerNum = props.playerNum;
  const playerHeroId = props.playerHeroId;
  const heroId = playerHeroId.slice(1, playerHeroId.length);
  const playerCardsId = `player${playerNum}cards`;
  const rowId = props.rowId;
  const cardFocus = props.cardFocus;
  const setCardFocus = props.setCardFocus;
  const unsetCardFocus = props.unsetCardFocus;
  
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

  // Applies damage to either shields or health as needed, returning both the shield and health value
  function applyDamage(damageValue, targetId) {
    const targetPlayerNum = targetId[0];

    let targetHealth = gameState.playerCards[`player${targetPlayerNum}cards`].cards[targetId].health;
    let targetShield = gameState.playerCards[`player${targetPlayerNum}cards`].cards[targetId].shield;
    
    for (let i = 0; i < damageValue; i++) {
      if (targetShield > 0) {
        targetShield -= 1;
      } else {
        targetHealth -= 1;
      }
    }

    return {targetHealth, targetShield};
  }

  // Abilities data
  const abilities = {
    dva: {
      ability2: {
        synergyCost: 2,
        run() {
          return new Promise((resolve, reject) => {
          
            props.setNextCardDraw(prevState => ({
              ...prevState,
              [`player${playerNum}`]: 'dvameka'
            }));

          resolve();
        })
        },
      },
    },
    dvameka: {
      ability1: {
        run() {
          const newShield = 2;

          setGameState((prevState) => ({
            ...prevState,
            playerCards: {
              ...prevState.playerCards,
              [`player${playerNum}cards`]: {
                ...prevState.playerCards[`player${playerNum}cards`],
                cards: {
                  ...prevState.playerCards[`player${playerNum}cards`].cards,
                  [`${playerNum}dvameka`]: {
                    ...prevState.playerCards[`player${playerNum}cards`].cards[`${playerNum}dvameka`],
                    shield: (prevState.playerCards[`player${playerNum}cards`].cards[`${playerNum}dvameka`].shield + newShield),
                  },
                },
              },
            },
          }));
        },
      },
      ability2: {
        synergyCost: 3,
        run() {
          const rowPosition = rowId[1];
          const enemyPlayer = playerNum === 1 ? 2 : 1;
          const playerRowCardIds = gameState.rows[rowId].cardIds;
          const enemyPlayerRowCardIds = gameState.rows[`${enemyPlayer}${rowPosition}`].cardIds;
          
          const damageValue = 4;
          
          // Damage own player cards
          for (let cardId of playerRowCardIds) {
            const { targetHealth, targetShield } = applyDamage(damageValue, cardId);
            
            setGameState((prevState) => ({
              ...prevState,
              playerCards: {
                ...prevState.playerCards,
                [`player${playerNum}cards`]: {
                  ...prevState.playerCards[`player${playerNum}cards`],
                  cards: {
                    ...prevState.playerCards[`player${playerNum}cards`].cards,
                    [cardId]: {
                      ...prevState.playerCards[`player${playerNum}cards`].cards[cardId],
                      health: targetHealth,
                      shield: targetShield,
                    },
                  },
                },
              },
            }));
          }
          

          // Damage enemy cards
          for (let cardId of enemyPlayerRowCardIds) {
            const { targetHealth, targetShield } = applyDamage(damageValue, cardId);  
            
            setGameState((prevState) => ({
              ...prevState,
              playerCards: {
                ...prevState.playerCards,
                [`player${enemyPlayer}cards`]: {
                  ...prevState.playerCards[`player${enemyPlayer}cards`],
                  cards: {
                    ...prevState.playerCards[`player${enemyPlayer}cards`].cards,
                    [cardId]: {
                      ...prevState.playerCards[`player${enemyPlayer}cards`].cards[cardId],
                      health: targetHealth,
                      shield: targetShield,
                    },
                  },
                },
              },
            }));
          }
            

          // After effects
          // Create new dva card 
          const newDva = helper.createPlayerCard(playerNum, 'dva');
          // Remove dvameka card from row (still exists in playercards)
          const newRowCards = gameState.rows[rowId].cardIds.filter(cardId => cardId !== `${playerNum}dvameka`);
          
          setGameState((prevState) => ({
            ...prevState,
            playerCards: {
              ...prevState.playerCards,
              [`player${playerNum}cards`]: {
                ...prevState.playerCards[`player${playerNum}cards`],
                cards: {
                  ...prevState.playerCards[`player${playerNum}cards`].cards,
                  [`${playerNum}dvameka`]: {
                    ...prevState.playerCards[`player${playerNum}cards`].cards[`${playerNum}dvameka`],
                    isDiscarded: true,
                  },
                  [newDva.playerHeroId]: newDva,
                },
              },
            },
            rows: {
              ...prevState.rows,
              [rowId]: {
                ...prevState.rows[rowId],
                cardIds: [...newRowCards, newDva.playerHeroId],
              },
            },
          }));

        },
      },
    },
    genji: {
      ability1: {
        maxTargets: 3,
        run() {
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              const targetCardId = $(e.target).closest(".card").attr("id");
              const enemyPlayer = targetCardId[0];
              const targetRow = $(e.target).closest(".row").attr("id");

              $(".card").off("click");
              // Check target is valid
              if (targetRow[0] === "p" || targetRow[0] === playerNum) {
                reject("Incorrect target");
                return;
              }

              const { targetHealth, targetShield } = applyDamage(1, targetCardId);
              // Apply abilities that affect a specific card

              setGameState((prevState) => ({
                ...prevState,
                playerCards: {
                  ...prevState.playerCards,
                  [`player${enemyPlayer}cards`]: {
                    ...prevState.playerCards[`player${enemyPlayer}cards`],
                    cards: {
                      ...prevState.playerCards[`player${enemyPlayer}cards`]
                        .cards,
                      [targetCardId]: {
                        ...prevState.playerCards[`player${enemyPlayer}cards`]
                          .cards[targetCardId],
                        health: targetHealth,
                        shield: targetShield,
                      },
                    },
                  },
                },
              }));

              resolve();
            });
          });
        },
      },
      ability2: {
        synergyCost: 3,
        run() {
          return new Promise((resolve, reject) => {
            
            // Execute the following when any card is clicked
            $(".card").on("click", (e) => {
              const targetCardId = $(e.target).closest(".card").attr("id");
              const enemyPlayer = targetCardId[0];
              const targetRow = $(e.target).closest(".row").attr("id");
              
              // Remove the onclick effect from all cards
              $(".card").off("click");
              // Check target is valid
              if (
                targetRow[0] === "p" ||
                targetRow[0] === playerNum ||
                // Check target has been damaged
                gameState.playerCards[`player${enemyPlayer}cards`].cards[
                  targetCardId
                ].health ===
                  gameState.playerCards[`player${enemyPlayer}cards`].cards[
                    targetCardId
                  ].maxHealth
              ) {
                reject("Incorrect target");
                return;
              }
              const cardKey = "health";
              const cardValue = 0;
              // Apply abilities that affect a specific card

              setGameState((prevState) => ({
                ...prevState,
                playerCards: {
                  ...prevState.playerCards,
                  [`player${enemyPlayer}cards`]: {
                    ...prevState.playerCards[`player${enemyPlayer}cards`],
                    cards: {
                      ...prevState.playerCards[`player${enemyPlayer}cards`]
                        .cards,
                      [targetCardId]: {
                        ...prevState.playerCards[`player${enemyPlayer}cards`]
                          .cards[targetCardId],
                        [cardKey]: cardValue,
                      },
                    },
                  },
                },
              }));
              resolve();
            });
          });
        },
      },
    },

    pharah: {
      ability1: {
        run() {

          return new Promise((resolve, reject) => {

            $(".card").on("click", (e) => {

              const targetCardId = $(e.target).closest(".card").attr("id");
              const enemyPlayer = targetCardId[0];
              const targetRow = $(e.target).closest(".row").attr("id");
              
              $(".card").off("click");

              if (targetRow[0] === "p" || targetRow[0] === playerNum) {
                // Check target is valid
                reject("Incorrect target row");
                return;

              } else if (targetRow[1] !== 'b') {
                // Move target back a row if not already in last row
                const newRow = `${enemyPlayer}${targetRow[1] === 'f' ? 'm' : 'b'}`;
                const updatedTargetRowCardIds = gameState.rows[targetRow].cardIds.filter(cardId => cardId !== targetCardId);
                const newRowCardIds = [...gameState.rows[newRow].cardIds, targetCardId];
                
                setGameState((prevState) => ({
                  ...prevState,
                  rows: {
                    ...prevState.rows,
                    [targetRow]: {
                      ...prevState.rows[targetRow],
                      cardIds: updatedTargetRowCardIds,
                    },
                    [newRow]: {
                      ...prevState.rows[newRow],
                      cardIds: newRowCardIds,
                    },
                  },
                }));
              }

              // Reduce synergy of target row
              setGameState((prevState) => ({
                ...prevState,
                rows: {
                  ...prevState.rows,
                  [targetRow]: {
                    ...prevState.rows[targetRow],
                    synergy: (prevState.rows[targetRow].synergy - 2),
                  },
                },
              }));

              resolve();
            });
          });

        },
      },
      ability2: {
        maxTargets: 3,
        synergyCost: 3,
        run() {
          
          return new Promise((resolve, reject) => {
            
            $(".card").on("click", (e) => {
              
              const targetCardId = $(e.target).closest(".card").attr("id");
              const enemyPlayer = targetCardId[0];
              const targetRow = $(e.target).closest(".row").attr("id");

              $(".card").off("click");
              // Check target is valid
              if (targetRow[0] === "p" || targetRow[0] === playerNum) {
                reject("Incorrect target");
                return;
              }

              const damageValue = 2;

              const { targetHealth, targetShield } = applyDamage(damageValue, targetCardId);

              // Apply abilities that affect a specific card

              setGameState((prevState) => ({
                ...prevState,
                playerCards: {
                  ...prevState.playerCards,
                  [`player${enemyPlayer}cards`]: {
                    ...prevState.playerCards[`player${enemyPlayer}cards`],
                    cards: {
                      ...prevState.playerCards[`player${enemyPlayer}cards`]
                        .cards,
                      [targetCardId]: {
                        ...prevState.playerCards[`player${enemyPlayer}cards`]
                          .cards[targetCardId],
                        health: targetHealth,
                        shield: targetShield,
                      },
                    },
                  },
                },
              }));

              resolve();
            });
          });

        },
      },
    },

    widowmaker: {
      ability1: {
        run() {
          return new Promise((resolve, reject) => {
            $(".row").on("click", (e) => {
              const targetRow = $(e.target).closest(".row").attr("id");
          
              const rowKey = "effects";
              const rowValue = "2widowmaker";

              $(".row").off("click");
              if (targetRow[0] === "p" || targetRow[0] === playerNum) {
                reject("Incorrect target");
              } else {
                setGameState((prevState) => ({
                  ...prevState,
                  rows: {
                    ...prevState.rows,
                    [targetRow]: {
                      ...prevState.rows[targetRow],
                      [rowKey]: [
                        ...prevState.rows[targetRow][rowKey],
                        rowValue,
                      ],
                    },
                  },
                }));
                resolve();
              }
            });
          });
        },
      },
      ability2: {
        synergyCost: 3,
        run() {
          console.log("widow ability2 started");
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              const targetCardId = $(e.target).closest(".card").attr("id");
              const enemyPlayer = targetCardId[0];
              const targetRow = $(e.target).closest(".row").attr("id");
              
              $(".card").off("click");
              if (targetRow[0] === "p" || targetRow[0] === playerNum) {
                reject("Incorrect target row");
                return;
              }
              const cardKey = "health";
              const cardValue = 0;
              // Apply abilities that affect a specific card

              setGameState((prevState) => ({
                ...prevState,
                playerCards: {
                  ...prevState.playerCards,
                  [`player${enemyPlayer}cards`]: {
                    ...prevState.playerCards[`player${enemyPlayer}cards`],
                    cards: {
                      ...prevState.playerCards[`player${enemyPlayer}cards`]
                        .cards,
                      [targetCardId]: {
                        ...prevState.playerCards[`player${enemyPlayer}cards`]
                          .cards[targetCardId],
                        [cardKey]: cardValue,
                      },
                    },
                  },
                },
              }));

              resolve();
            });
          });
        },
      },
    },

    zenyatta: {
      ability1: {
        maxTargets: 1,
        run() {
          
        },
      },
      ability2: {
        synergyCost: 3,
        run() {},
      },
    },
  };

  // Handle the calling of hero abilites, including checking the ability call is valid
  async function activateAbility1(e) {
    e.stopPropagation();
    const maxTargets = abilities[heroId].ability1.maxTargets;

    // Check that the card is not in the player's hand
    if (rowId[0] !== "p") {
      // Call the relevant hero's ability
      try {
        unsetCardFocus();
        
        if ('maxTargets' in abilities[heroId].ability1) {
          // Allow the ability to be triggered more than once if relevant
          let i = 0;  
          do {
            await abilities[heroId].ability1.run();
            i += 1;
          } while (i < maxTargets);
        
        } else await abilities[heroId].ability1.run();
        
      } catch (err) {
        alert(err);
      }
    } else alert("Play cards before using abilities!");
  }

  async function activateAbility2(e) {
    e.stopPropagation();
    const synergyCost = abilities[heroId].ability2.synergyCost;
    const rowSynergy = gameState.rows[rowId].synergy;
    
    // Check that the card is not in the player's hand
    if (rowId[0] !== "p") {
      // Check there is sufficient synergy to use the ability
      if (rowSynergy >= synergyCost) {
        // Call the relevant hero's ability and deduct synergy
        try {
          unsetCardFocus();
          
          // Allow multiple targets if applicable
          if ('maxTargets' in abilities[heroId].ability2) {
            const maxTargets = abilities[heroId].ability2.maxTargets;
            let i = 0;
            do {
              await abilities[heroId].ability2.run();
              i += 1;
            } while (i < maxTargets);
          } else await abilities[heroId].ability2.run();
          
          setRowSynergy(rowId, synergyCost);
        } catch (err) {
          alert(err);
        }
      } else alert("Insufficient synergy!");
    } else alert("Play cards before using abilities!");
  }

  return (
    <div id="abilitiescontainer">
      <div
        id="ability1"
        className="ability ability1"
        onClick={activateAbility1}
      ></div>
      <div
        id="ability2"
        className="ability ability2"
        onClick={activateAbility2}
      ></div>
    </div>
  );
}
