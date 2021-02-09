import React, { useContext, useEffect, useRef, useMemo } from "react";
import gameContext from "context/gameContext";
import turnContext from "context/turnContext";
import $ from "jquery";
import { ACTIONS } from "App";
import helper from "helper";

export default function HeroAbilities(props) {
  // Context
  const { gameState, dispatch } = useContext(gameContext);
  const { turnState, setTurnState } = useContext(turnContext);

  // Variables
  const playerNum = turnState.playerTurn;
  const enemyPlayerNum = playerNum === 1 ? 2 : 1;

  const playerHeroId = props.playerHeroId;
  const currentCard =
    gameState.playerCards[`player${playerHeroId[0]}cards`].cards[playerHeroId];
  const heroId = playerHeroId.slice(1, playerHeroId.length);
  const rowId = props.rowId;
  const unsetCardFocus = props.unsetCardFocus;

  // Need useRef to keep track of card health during async ability usages
  // TODO: later if implementing more built in controls, such as only allowing
  // TODO: user to affect cards in a specific row, create another ref to track
  // TODO: row target info and reference it during the hero's ability call
  let targetRef = useRef(null);
  let turnRef = useRef(turnState);

  // Ensures targetRef only contains values during ability usage,
  // Reset to empty object when rerendering (i.e. when ability is finished)
  useEffect(() => {
    targetRef.current = {};
  });

  // Applies damage to either shields or health as needed, returning both the shield and health value
  // TODO: currently only damage has its own function that sets state, all other state
  // TODO: is set within the hero's ability
  function applyDamage(damageValue, targetCardId, targetRow) {
    // Identify target player
    const targetPlayerNum = parseInt(targetCardId[0]);
    const targetPlayerCards =
      gameState.playerCards[`player${targetPlayerNum}cards`].cards;

      console.log(targetPlayerCards)

    // Get hero health and shield values
    let targetHealth = targetPlayerCards[targetCardId].health;
    let targetShield = targetPlayerCards[targetCardId].shield;
    let targetRowShield = gameState.rows[targetRow].shield;

    // TODO: check effects that alter damage
    // Check ally and enemy row effects that apply to damage
    const targetRowAllyEffects = gameState.rows[targetRow].allyEffects.filter(
      (effect) => effect.type === "damage"
    );
    const targetRowEnemyEffects = gameState.rows[targetRow].enemyEffects.filter(
      (effect) => effect.type === "damage"
    );
    // Calculate net total of effects on the row
    let totalRowEffect = 0;
    for (let effect of targetRowAllyEffects) {
      totalRowEffect += effect.value;
    }
    for (let effect of targetRowEnemyEffects) {
      totalRowEffect += effect.value;
    }

    // Check ally and enemy card effects
    const targetCardAllyEffects = targetPlayerCards[targetCardId].allyEffects.filter(
      (effect) => effect.type === "damage"
    );
    const targetCardEnemyEffects = targetPlayerCards[targetCardId].enemyEffects.filter(
      (effect) => effect.type === "damage"
    );
    // Calculate net total of card effects
    let totalCardEffect = 0;
    for (let effect of targetCardAllyEffects) {
      totalCardEffect += effect.value;
    }
    for (let effect of targetCardEnemyEffects) {
      totalCardEffect += effect.value;
    }

    // Net total of all damage effects on both row and card
    const totalEffect = totalRowEffect + totalCardEffect;

    // If the enemy hasn't been targeted during the current ability, apply the damage effect
    if (!(targetCardId in targetRef.current)) {
      damageValue += totalEffect;
    }

    // If the target has already been targeted during this ability, update with current values
    // Needed because gameState is only updated once the entire ability is finished, so
    // we need useRef in order to keep track of the damaged hero's changing health/shield value
    if (targetCardId in targetRef.current) {
      targetHealth = targetRef.current[targetCardId].health;
      targetShield = targetRef.current[targetCardId].shield;
    }
    if (targetRow in targetRef.current) {
      targetRowShield = targetRef.current[targetRow].shield;
    }

    // Initialise ref if not been used yet during this ability
    targetRef.current[targetCardId] = {};

    try {
      // Decrement the target's health/shield/rowshield as needed
      for (let i = 0; i < damageValue; i++) {
        // Damage row shield before all else, and update ref
        if (targetRowShield > 0) {
          targetRowShield -= 1;
  
          targetRef.current[targetRow] = {};
          targetRef.current[targetRow]["shield"] = targetRowShield;
  
          dispatch({
            type: ACTIONS.ADD_ROW_EFFECT,
            payload: {
              targetRow: targetRow,
              rowShield: targetRowShield,
            },
          });
          return;
  
          // Damage hero shield before health, and update ref
        } else if (targetShield > 0) {
          targetShield -= 1;
          targetRef.current[targetCardId]["shield"] = targetShield;
  
          // Damage hero health and update ref
        } else if (targetHealth > 0) {
          targetHealth -= 1;
          targetRef.current[targetCardId]["health"] = targetHealth;
          targetHealth = Math.max(0, targetHealth);
        } else if (targetHealth === 0) {
          console.log('target health is 0')
          return;
        } else {
          throw new Error(`${targetCardId} is at ${targetHealth} health`);
        }
      }

    } catch(err) {
      console.log(err);
    }

    // Set the new state (will be done in batch at the end of the ability)
    dispatch({
      type: ACTIONS.EDIT_CARD,
      payload: {
        playerNum: targetPlayerNum,
        targetCardId: targetCardId,
        editKeys: ["health", "shield"],
        editValues: [targetHealth, targetShield],
      },
    });
    return;
  }

  function applyHealing(healingValue, targetCardId) {
    const targetPlayerNum = targetCardId[0];
    const targetPlayerCards =
      gameState.playerCards[`player${targetPlayerNum}cards`].cards;

    // Get hero health
    let targetHealth = targetPlayerCards[targetCardId].health;
    const targetMaxHealth = targetPlayerCards[targetCardId].maxHealth;
    
    if (targetCardId in targetRef.current) {
      targetHealth = targetRef.current[targetCardId].health;
    }

    // Initialise ref if not been used yet during this ability
    targetRef.current[targetCardId] = {};

    // Increment health value
    if (targetHealth !== 0) {
      for (let i = 0; i < healingValue; i++) {
        if (targetHealth < targetMaxHealth) {
          targetHealth += 1;
          targetRef.current[targetCardId]["health"] = targetHealth;
        }      
      }
      // Set the new state (will be done in batch at the end of the ability)
      dispatch({
        type: ACTIONS.EDIT_CARD,
        payload: {
          playerNum: targetPlayerNum,
          targetCardId: targetCardId,
          editKeys: ["health"],
          editValues: [targetHealth],
        },
      });
    }
    return;
  }

  // Abilities data
  const abilities = {
    ana: {
      ability1: {
        audioFile: "ana-grenade",
        run() {
          return new Promise((resolve, reject) => {
            // When a row is clicked
            $(".row").on("click", (e) => {
              
              // Get target information
              const targetRow = $(e.target).closest(".row").attr("id");
              const rowPosition = targetRow[1];
              
              // Remove the onclick
              $(".row").off("click");
              
              // Check target is valid
              if (targetRow[0] === "p") {
                reject("Incorrect target");
                return;
              }
              
              const enemyPlayer = playerNum === 1 ? 2 : 1;
              const playerRowCardIds = gameState.rows[`${playerNum}${rowPosition}`].cardIds;
              const enemyPlayerRowCardIds =
                gameState.rows[`${enemyPlayer}${rowPosition}`].cardIds;
    
              const damageValue = 1;
              const healValue = 1;
    
              // Heal own player cards
              for (let cardId of playerRowCardIds) {
                applyHealing(healValue, cardId);
              }
    
              // Damage enemy cards
              for (let cardId of enemyPlayerRowCardIds) {
                applyDamage(damageValue, cardId, `${enemyPlayer}${rowPosition}`);
              }
              
              resolve();
            });

          });

        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: "ana-ult",
        run() {
          const currentRowAllyNumber = gameState.rows[rowId].cardIds.length;
          const effectId = 'anaUltimateEffect';

          // TODO: ensure ana's ultimate can be removed by hack/EMP

        }
      },
      anaUltimateEffect: {

      },
    },
    ashe: {
      ability1: {
        audioFile: "ashe-deadlockgang",
      },
      ability2: {
        synergyCost: 3,
        audioFile: "ashe-bob",
        run() {
          // Create bob card
          dispatch({
            type: ACTIONS.CREATE_CARD,
            payload: {
              playerNum: playerNum,
              heroId: "bob",
            },
          });

          // Add summoned hero to hand
          dispatch({
            type: ACTIONS.ADD_CARD_TO_HAND,
            payload: {
              playerNum: playerNum,
              playerHeroId: `${playerNum}bob`,
            },
          });
        }
      },
    },
    baptiste: {
      ability1: {
        audioFile: "baptiste-notover",
      },
      ability2: {
        synergyCost: 3,
        audioFile: "baptiste-immortality",
      },
    },
    bastion: {
      ability1: {},
      ability2: {
        synergyCost: 3,
        audioFile: "bastion-ult",
      },
    },
    bob: {
      ability1: {},
      ability2: {
        synergyCost: 1,
      },
    },
    brigitte: {
      ability1: {
        audioFile: "brigitte-armour",
      },
      ability2: {
        synergyCost: 3,
        audioFile: "brigitte-ult",
      },
    },
    doomfist: {
      ability1: {
        audioFile: "doomfist-punch",
        run() {
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetCardIndex = $(e.target).closest("li").index();
              const enemyPlayer = parseInt(targetCardId[0]);
              const targetCardRow = $(e.target).closest(".row").attr("id");

              $(".card").off("click");

              // Check target is valid
              if (
                targetCardRow[0] === "p" ||
                parseInt(targetCardRow[0]) === playerNum
              ) {
                reject("Incorrect target row");
                return;
              } else if (targetCardRow[1] !== "b") {
                // Move target back a row if not already in last row
                const newRowId = `${enemyPlayer}${
                  targetCardRow[1] === "f" ? "m" : "b"
                }`;

                // Set state
                dispatch({
                  type: ACTIONS.MOVE_CARD,
                  payload: {
                    targetCardId: targetCardId,
                    startRowId: targetCardRow,
                    finishRowId: newRowId,
                    startIndex: targetCardIndex,
                    finishIndex: 0,
                  },
                });
              }

              // Apply damage to target
              const damageValue = 2;
              applyDamage(damageValue, targetCardId, targetCardRow);

              resolve();
            });
          });
        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: "doomfist-ult",
      },
    },
    dva: {
      ability2: {
        synergyCost: 2,
        audioFile: "dva-ult",
        run() {
          return new Promise((resolve, reject) => {
            props.setNextCardDraw((prevState) => ({
              ...prevState,
              [`player${playerNum}`]: "dvameka",
            }));

            resolve();
          });
        },
      },
    },
    dvameka: {
      ability1: {
        audioFile: "dvameka-apm",
        run() {
          // Add shield to dvameka card
          const newShield = 2;
          dispatch({
            type: ACTIONS.UPDATE_CARD,
            payload: {
              playerNum: playerNum,
              cardId: `${playerNum}dvameka`,
              updateKeys: ["shield"],
              updateValues: [newShield],
            },
          });
        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: "dvameka-nerfthis",
        run() {
          const rowPosition = rowId[1];
          const enemyPlayer = playerNum === 1 ? 2 : 1;
          const playerRowCardIds = gameState.rows[rowId].cardIds;
          const enemyPlayerRowCardIds =
            gameState.rows[`${enemyPlayer}${rowPosition}`].cardIds;
          const dvamekaIndex = $(`#${playerNum}dvameka`).closest("li").index();

          const damageValue = 4;

          // Damage own player cards, except for dvameka using the ability
          for (let cardId of playerRowCardIds) {
            if (cardId !== `${playerNum}dvameka`) {
              applyDamage(damageValue, cardId, rowId);
            }
          }

          // Damage enemy cards
          for (let cardId of enemyPlayerRowCardIds) {
            applyDamage(damageValue, cardId, `${enemyPlayer}${rowPosition}`);
          }

          // After effects
          // Discard dvameka card
          dispatch({
            type: ACTIONS.DISCARD_CARD,
            payload: {
              playerNum: playerNum,
              targetCardId: `${playerNum}dvameka`,
              targetCardRow: rowId,
            },
          });

          // Create baby dva card
          dispatch({
            type: ACTIONS.CREATE_CARD,
            payload: {
              playerNum: playerNum,
              heroId: "dva",
            },
          });

          // Add baby dva to row dvameka was in
          dispatch({
            type: ACTIONS.ADD_CARD_TO_HAND,
            payload: {
              playerNum: playerNum,
              playerHeroId: `${playerNum}dva`,
            },
          });

          // Get Dva's index in player hand
          const dvaIndex = $(`#${playerNum}dva`).closest("li").index();

          // Move dva from player hand to dvameka's former position
          dispatch({
            type: ACTIONS.MOVE_CARD,
            payload: {
              targetCardId: `${playerNum}dva`,
              startRowId: `player${playerNum}hand`,
              finishRowId: rowId,
              startIndex: dvaIndex,
              finishIndex: dvamekaIndex,
            },
          });
        },
      },
    },
    echo: {
      ability1: {},
      ability2: {
        synergyCost: 2,
      },
    },
    genji: {
      ability1: {
        maxTargets: 3,
        audioFile: "genji-cutting",
        run() {
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              // Get target info
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetRow = $(e.target).closest(".row").attr("id");

              // Remove onclick
              $(".card").off("click");

              // Check target is valid
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) === playerNum
              ) {
                reject("Incorrect target");
                return;
              }

              // Apply damage to the target card (includes setting state)
              const damageValue = 1;
              applyDamage(damageValue, targetCardId, targetRow);

              // Apply abilities that affect a specific card

              resolve("resolved!");
            });
          });
        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: "genji-ult",
        run() {
          return new Promise((resolve, reject) => {
            // Execute the following when any card is clicked
            $(".card").on("click", (e) => {
              const targetCardId = $(e.target).closest(".card").attr("id");
              const enemyPlayer = parseInt(targetCardId[0]);
              const targetRow = $(e.target).closest(".row").attr("id");

              // Remove the onclick effect from all cards
              $(".card").off("click");
              // Check target is valid
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) === playerNum ||
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

              // Apply abilities that affect a specific card
              dispatch({
                type: ACTIONS.EDIT_CARD,
                payload: {
                  playerNum: enemyPlayer,
                  targetCardId: targetCardId,
                  editKeys: ["health"],
                  editValues: [0],
                },
              });

              resolve();
            });
          });
        },
      },
    },
    hanzo: {
      ability1: {
        audioFile: "hanzo-marked",
        run() {
          // Wait for user click
          return new Promise((resolve, reject) => {
            // When a row is clicked
            $(".row").on("click", (e) => {
              // Get target information & remove onclick
              const targetRow = $(e.target).closest(".row").attr("id");
              $(".row").off("click");

              // Check target is valid
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) === playerNum
              ) {
                reject("Incorrect target");
                return;
              }

              // Apply effect
              const effectId = 'hanzoEnemyEffect';
              dispatch({
                type: ACTIONS.ADD_ROW_EFFECT,
                payload: {
                  targetRow: targetRow,
                  playerHeroId: `${playerNum}hanzo`,
                  effectId: effectId,
                },
              });

              resolve();
            });
          });
        },
      },
      ability2: {
        audioFile: "hanzo-ult",
        maxTargets: 3,
        synergyCost: 3,
        run() {
          // Wait for user input
          return new Promise((resolve, reject) => {
            // Specifically, wait for user to click on a card
            $(".card").on("click", (e) => {
              // Get target info
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetPlayerNum = parseInt(targetCardId[0]);
              const targetRow = $(e.target).closest(".row").attr("id");

              // Remove onclick
              $(".card").off("click");

              // Check target is valid
              // TODO: check that target cards are actually in the same column
              // TODO: currently just relying on user to choose correctly
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) === playerNum
              ) {
                reject("Incorrect target");
                return;
              }

              // Apply damage to the target card (includes setting state)
              const damageValue = 3;
              applyDamage(damageValue, targetCardId, targetRow);

              resolve();
            });
          });
        },
      },
    },
    junkrat: {
      ability1: {
        audioFile: "junkrat-laugh",
      },
      ability2: {
        audioFile: "junkrat-ult",
        synergyCost: 3,
      },
    },
    lucio: {
      ability1: {
        audioFile: "lucio-ampitup",
        run() {
          // Wait for user click
          return new Promise((resolve, reject) => {
            // When a row is clicked
            $(".row").on("click", (e) => {
              
              // Get target information
              const targetRow = $(e.target).closest(".row").attr("id");
              
              // Remove the onclick
              $(".row").off("click");
              
              // Check target is valid
              if (targetRow[0] === "p" ||parseInt(targetRow[0]) !== playerNum) {
                reject("Incorrect target");
                return;
              }
                
              // Effect id
              const effectId = 'lucioAllyEffect';
              // Apply effect
              dispatch({
                type: ACTIONS.ADD_ROW_EFFECT,
                payload: {
                  targetRow: targetRow,
                  playerHeroId: `${playerNum}lucio`,
                  effectId: effectId,
                },
              });

              resolve();
            });
          });
        }
      },
      ability2: {
        audioFile: "lucio-ult",
        synergyCost: 3,
      },
      lucioAllyEffect: {
        run(rowId) {
          const targetRowCardIds = gameState.rows[rowId].cardIds;
          const healingValue = 1;

          for (let cardId of targetRowCardIds) {
            applyHealing(healingValue, cardId);
          }

          return;
        },
      },
    },
    mccree: {
      ability1: {
        audioFile: "mccree-fishinabarrel",
        run() {
          return new Promise((resolve, reject) => {
            // When any card is clicked
            $(".row").on("click", (e) => {
              // Get target info
              const targetCardRow = $(e.target).closest(".row").attr("id");
              const enemyPlayer = parseInt(targetCardRow[0]);
              const rowEnemies = gameState.rows[targetCardRow].cardIds.length;

              // Remove onclick from all cards
              $(".row").off("click");

              // Check target is valid
              if (
                targetCardRow[0] === "p" ||
                parseInt(targetCardRow[0]) === playerNum
              ) {
                reject("Incorrect target row");
                return;
              }

              // Reduce synergy of target row
              dispatch({
                type: ACTIONS.UPDATE_SYNERGY,
                payload: {
                  rowId: targetCardRow,
                  synergyCost: Math.abs(rowEnemies) * -1,
                },
              });

              resolve();
            });
          });
        },
      },
      ability2: {
        audioFile: "mccree-ult",
        synergyCost: 3,
        run() {
          return new Promise((resolve, reject) => {
            $(".row").on("click", async (e) => {
              const targetRow = $(e.target).closest(".row").attr("id");

              $(".row").off("click");

              // Check target is valid
              if (targetRow[0] === "p" || parseInt(targetRow[0]) === playerNum) {
                reject("Incorrect target row");
                return;
              }

              // Get all cards in the target row
              const targetRowCardIds = $.map(
                $(`#${targetRow} .card`),
                function (card) {
                  return card.id;
                }
              );

              // Apply damange
              const totalDamage = 6;
              const damagePerEnemy = Math.floor(totalDamage / targetRowCardIds.length);
              let damageDone = 0;
              targetRowCardIds.forEach((cardId) => {
                applyDamage(damagePerEnemy, cardId, targetRow);
                damageDone += damagePerEnemy;
              });

              if (damageDone < totalDamage) {
                let remainingDamage = totalDamage - damageDone;

                alert(
                  `${remainingDamage} left over. Choose who should receive it! (1 damage per click)`
                );
                
                // Define the function that will apply remaining damage
                const applyRemainingDamage = () => {
                  return new Promise((resolve, reject) => {
                    $(".card").on("click", (e) => {
                      const targetCard = $(e.target).closest(".card").attr("id");
                      const targetRow = $(e.target).closest(".row").attr("id");
      
                      $(".card").off("click");
      
                      // Check target is valid
                      if (targetRow[0] === "p" || parseInt(targetRow[0]) === playerNum) {
                        reject("Incorrect target row");
                        return;
                      }
      
                      applyDamage(1, targetCard, targetRow);                
                      resolve();
                    });
                  });
                }
    
                do {
                  await applyRemainingDamage();
                  remainingDamage--;
                } while (remainingDamage > 0)
              }

              resolve();
            });
          });
        },
      },
    },
    mei: {
      ability1: {
        audioFile: "mei-goticed",
      },
      ability2: {
        audioFile: "mei-ult",
        synergyCost: 2,
      },
    },
    mercy: {
      ability1: {
        audioFile: "mercy-medicalemergency",
        run() {
          // Wait for user click
          return new Promise((resolve, reject) => {
            // When a row is clicked
            $(".card").on("click", (e) => {
              // Get target information & remove onclick
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetRow = $(e.target).closest(".row").attr("id");

              console.log(targetRow)

              // Remove click event from all cards
              $(".card").off("click");

              // Check target is valid
              if (targetRow[0] === "p" || parseInt(targetRow[0]) !== playerNum) {
                reject("Incorrect target");
                return;
              }

              // Apply effect 
              // TODO: find way to decide between the two mercy ally effects - currently only healing effect is implemented
              let effectId = 'mercyAllyEffect1';

              // Harmony orb applies healing immediately, as well as over time
              if (effectId === 'mercyAllyEffect1') {
                const healingValue = 2;
                applyHealing(healingValue, targetCardId);
              }

              // Set state
              dispatch({
                type: ACTIONS.ADD_CARD_EFFECT,
                payload: {
                  targetCardId: targetCardId,
                  playerHeroId: `${playerNum}mercy`,
                  effectId: effectId,
                },
              });

              resolve();
            });
          });
        },
      },
      ability2: {
        audioFile: "mercy-ult",
        synergyCost: 3,
      },
      mercyAllyEffect1: {
        run(cardId) {
          const healingValue = 1;
          applyHealing(healingValue, cardId);
          return;
        },
      },
    },
    moira: {
      ability1: {
        audioFile: "moira-grasp",
      },
      ability2: {
        synergyCost: 3,
        audioFile: "moira-ult",
      },
    },
    orisa: {
      ability1: {
        audioFile: "orisa-barrier",
      },
      ability2: {
        synergyCost: 3,
        audioFile: "orisa-ult",
      },
    },
    pharah: {
      ability1: {
        audioFile: "pharah-clear",
        run() {
          return new Promise((resolve, reject) => {
            // When any card is clicked
            $(".card").on("click", (e) => {
              // Get target info
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetCardIndex = $(e.target).closest("li").index();
              const enemyPlayer = parseInt(targetCardId[0]);
              const targetCardRow = $(e.target).closest(".row").attr("id");

              // Remove onclick from all cards
              $(".card").off("click");

              // Check target is valid
              if (
                targetCardRow[0] === "p" ||
                parseInt(targetCardRow[0]) === playerNum
              ) {
                reject("Incorrect target row");
                return;

                // Move target back a row if not already in last row
              } else if (targetCardRow[1] !== "b") {
                const newRowId = `${enemyPlayer}${
                  targetCardRow[1] === "f" ? "m" : "b"
                }`;

                dispatch({
                  type: ACTIONS.MOVE_CARD,
                  payload: {
                    targetCardId: targetCardId,
                    startRowId: targetCardRow,
                    finishRowId: newRowId,
                    startIndex: targetCardIndex,
                    finishIndex: 0,
                  },
                });
              }

              // Reduce synergy of target row
              dispatch({
                type: ACTIONS.UPDATE_SYNERGY,
                payload: {
                  rowId: targetCardRow,
                  synergyCost: -2,
                },
              });

              resolve();
            });
          });
        },
      },
      ability2: {
        maxTargets: 3,
        synergyCost: 3,
        audioFile: "pharah-ult",
        run() {
          // Wait for user input
          return new Promise((resolve, reject) => {
            // Specifically, wait for user to click on a card
            $(".card").on("click", (e) => {
              // Get target info
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetPlayerNum = parseInt(targetCardId[0]);
              const targetRow = $(e.target).closest(".row").attr("id");

              // Remove onclick
              $(".card").off("click");

              // Check target is valid
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) === playerNum
              ) {
                reject("Incorrect target");
                return;
              }

              // Apply damage to the target card (includes setting state)
              const damageValue = 2;
              applyDamage(damageValue, targetCardId, targetRow);

              resolve();
            });
          });
        },
      },
    },
    reaper: {
      ability1: {
        audioFile: "reaper-lastwords",
        maxTargets: 2,
        run() {
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              // Get target info
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetRow = $(e.target).closest(".row").attr("id");

              // Remove onclick
              $(".card").off("click");

              // Check target is valid
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) === playerNum
              ) {
                reject("Incorrect target");
                return;
              }

              // Apply damage to the target card (includes setting state)
              const damageValue = 1;
              applyDamage(damageValue, targetCardId, targetRow);

              resolve();
            });
          });
        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: "reaper-ult",
        run() {
          // Get target info
          const rowPosition = rowId[1];
          const enemyPlayer = playerNum === 1 ? 2 : 1;
          const enemyPlayerRowCardIds =
            gameState.rows[`${enemyPlayer}${rowPosition}`].cardIds;

          // Damage enemy cards
          const damageValue = 3;
          for (let cardId of enemyPlayerRowCardIds) {
            applyDamage(damageValue, cardId, `${enemyPlayer}${rowPosition}`);
          }

          // After effects
          // Discard card
          dispatch({
            type: ACTIONS.DISCARD_CARD,
            payload: {
              playerNum: playerNum,
              targetCardId: `${playerNum}reaper`,
              targetCardRow: rowId,
            },
          });

        },
      },
    },
    reinhardt: {
      ability1: {
        audioFile: "reinhardt-barrier",
        run() {
          // Apply shield to row
          const shieldValue = 3;
          dispatch({
            type: ACTIONS.ADD_ROW_EFFECT,
            payload: {
              targetRow: rowId,
              rowShield: shieldValue,
            },
          });
        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: "reinhardt-ult",
      },
    },
    roadhog: {
      ability1: {
        audioFile: "roadhog-hook",
        run() {
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              // Get target info
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetCardIndex = $(e.target).closest("li").index();
              const targetCardRow = $(e.target).closest(".row").attr("id");
              const enemyPlayer = parseInt(targetCardId[0]);

              // Remove onclick from all cards
              $(".card").off("click");

              // Check target is valid
              if (
                targetCardRow[0] === "p" ||
                parseInt(targetCardRow[0]) === playerNum
              ) {
                reject("Incorrect target row");
                return;
              }

              // Move target to front row
              const newRowId = `${enemyPlayer}f`;
              dispatch({
                type: ACTIONS.MOVE_CARD,
                payload: {
                  targetCardId: targetCardId,
                  startRowId: targetCardRow,
                  finishRowId: newRowId,
                  startIndex: targetCardIndex,
                  finishIndex: 0,
                },
              });

              // Apply damage to the target card (includes setting state)
              const damageValue = 2;
              applyDamage(damageValue, targetCardId, targetCardRow);

              resolve();
            });
          });
        },
      },
      ability2: {
        audioFile: "roadhog-hogwild",
        synergyCost: 3,
        async run() {
          // TODO
          // Get target info
          const enemyPlayer = playerNum === 1 ? 2 : 1;

          // Copy arrays of cards from state, assign id to the row for later reference
          // We will manipulate the array, so we dont want a reference to the original array
          const enemyBackRowCards = Array.from(
            gameState.rows[`${enemyPlayer}b`].cardIds
          );
          enemyBackRowCards["id"] = `${enemyPlayer}b`;
          const enemyMiddleRowCards = Array.from(
            gameState.rows[`${enemyPlayer}m`].cardIds
          );
          enemyMiddleRowCards["id"] = `${enemyPlayer}m`;
          const enemyFrontRowCards = Array.from(
            gameState.rows[`${enemyPlayer}f`].cardIds
          );
          enemyFrontRowCards["id"] = `${enemyPlayer}f`;

          const enemyRows = [
            enemyBackRowCards,
            enemyMiddleRowCards,
            enemyFrontRowCards,
          ];

          // Filter out heros at 0 health
          for (let row of enemyRows) {
            row.filter((cardId) => {
              if (
                gameState.playerCards[`player${enemyPlayer}cards`].cards[cardId]
                  .health > 0
              ) {
                return cardId;
              }
              return null;
            });
          }

          // Get total damage amount (2d6 = between 2 - 12)
          const totalDamage = helper.getRandInt(2, 13);
          alert(`Wholehog rolled ${totalDamage} damage!`);

          // Calculate damage per hero and apply
          const totalEnemyCards =
            enemyBackRowCards.length +
            enemyMiddleRowCards.length +
            enemyFrontRowCards.length;
          const damageValue = Math.floor(totalDamage / totalEnemyCards);
          let damageDone = 0;
          if (damageValue > 0) {
            for (let row of enemyRows) {
              for (let cardId of row) {
                applyDamage(damageValue, cardId, row.id);
                damageDone += damageValue;
              }
            }
          }

          // Calculate damage that cant be evenly spread among all enemy heroes
          let remainingDamage = totalDamage - damageDone;

          // Allow user to spread remaining damage
          if (remainingDamage > 0) {
            alert(
              `${remainingDamage} left over. Choose who should receive it! (1 damage per click)`
            );
            
            // Define the function that will apply remaining damage
            const applyRemainingDamage = () => {
              return new Promise((resolve, reject) => {
                $(".card").on("click", (e) => {
                  const targetCard = $(e.target).closest(".card").attr("id");
                  const targetRow = $(e.target).closest(".row").attr("id");
  
                  $(".card").off("click");
  
                  // Check target is valid
                  if (targetRow[0] === "p" || parseInt(targetRow[0]) === playerNum) {
                    reject("Incorrect target row");
                    return;
                  }
  
                  applyDamage(1, targetCard, targetRow);                
                  resolve();
                });
              });
            }

            do {
              await applyRemainingDamage();
              remainingDamage--;
            } while (remainingDamage > 0)

          }
        },
      },
    },
    sigma: {
      ability1: {
        audioFile: "sigma-barrier",
        run() {
          // Wait for user click
          return new Promise((resolve, reject) => {
            // When a row is clicked
            $(".row").on("click", (e) => {
              // Get target information
              const targetRow = $(e.target).closest(".row").attr("id");

              // Remove the onclick
              $(".row").off("click");

              // Check target is valid
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) !== playerNum
              ) {
                reject("Incorrect target");
                return;
              }

              // Apply effect
              const shieldValue = 3;
              dispatch({
                type: ACTIONS.ADD_ROW_EFFECT,
                payload: {
                  targetRow: targetRow,
                  rowShield: shieldValue,
                },
              });

              resolve();
            });
          });
        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: "sigma-ult",
        run() {
          return new Promise((resolve, reject) => {
            $(".row").on("click", (e) => {
              const targetRow = $(e.target).closest(".row").attr("id");

              $(".row").off("click");

              // Check target is valid
              if (targetRow[0] === "p" || parseInt(targetRow[0]) === playerNum) {
                reject("Incorrect target row");
                return;
              }

              // Reduce synergy of target row to 0
              dispatch({
                type: ACTIONS.SET_SYNERGY,
                payload: {
                  rowId: targetRow,
                  newSynergyVal: 0,
                },
              });

              // Get all cards in the target row
              const targetRowCardIds = $.map(
                $(`#${targetRow} .card`),
                function (card) {
                  return card.id;
                }
              );

              // Apply damange
              const damageValue = 1;
              targetRowCardIds.forEach((cardId) => {
                applyDamage(damageValue, cardId, targetRow);
              });

              resolve();
            });
          });
        },
      },
    },
    soldier: {
      ability1: {
        audioFile: "soldier-teamheal",
        run() {
          // Get target info
          const playerRowCardIds =
            gameState.rows[rowId].cardIds;

          // Damage enemy cards
          const healValue = 1;
          for (let cardId of playerRowCardIds) {
            applyHealing(healValue, cardId);
          }

        },
      },
      ability2: {
        audioFile: "soldier-ult",
        maxTargets: 3,
        synergyCost: 3,
        run() {},
      },
    },
    sombra: {
      ability1: {
        audioFile: "sombra-hack",
      },
      ability2: {
        synergyCost: 3,
        audioFile: "sombra-ult",
      },
    },
    symmetra: {
      ability1: {
        audioFile: "symmetra-teleporter",
        run() {
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              // Get target info
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetCardIndex = $(e.target).closest("li").index();
              const targetCardRow = $(e.target).closest(".row").attr("id");

              // Remove onclick from all cards
              $(".card").off("click");

              // Check target is valid
              if (targetCardRow[0] === "p" || parseInt(targetCardRow[0]) !== playerNum) {
                reject("Incorrect target row");
                return;
              }

              // Move target to playerhand
              const newRowId = `player${playerNum}hand`;
              dispatch({
                type: ACTIONS.MOVE_CARD,
                payload: {
                  targetCardId: targetCardId,
                  startRowId: targetCardRow,
                  finishRowId: newRowId,
                  startIndex: targetCardIndex,
                  finishIndex: 0,
                },
              });

              // TODO: Remove all counter related to the hero

              // Set card to not played
              /* 
              Do not reset the card's synergy, despite what it says on the card
              Symmetra's teleporter ability as written on the card is very simple
              Keeping the teleported card's synergy in the row, and not resetting the card's synergy,
              adds a bit more complexity and strategy to how this ability is used
              */
              dispatch({
                type: ACTIONS.EDIT_CARD,
                payload: {
                  playerNum: playerNum,
                  targetCardId: targetCardId,
                  editKeys: ["isPlayed"],
                  editValues: [false],
                },
              });

              // Reduce number of cards played by player
              dispatch({
                type: ACTIONS.UPDATE_ROW,
                payload: {
                  targetRow: `player${playerNum}hand`,
                  updateKeys: ['cardsPlayed'],
                  updateValues: [-1],
                }
              })

              resolve();
            });
          });
        },
      },
      ability2: {
        audioFile: "symmetra-shield",
        synergyCost: 3,
        run() {
          const playerBackRowCardIds = gameState.rows[`${playerNum}b`].cardIds;
          const playerMiddleRowCardIds = gameState.rows[`${playerNum}m`].cardIds;
          const playerFrontRowCardIds = gameState.rows[`${playerNum}f`].cardIds;

          const playerCards = [playerBackRowCardIds, playerMiddleRowCardIds, playerFrontRowCardIds];

          // Add shield to all ally cards
          for (let row of playerCards) {
            for (let cardId of row) {
              const newShield = 1;
              dispatch({
                type: ACTIONS.UPDATE_CARD,
                payload: {
                  playerNum: playerNum,
                  cardId: cardId,
                  updateKeys: ["shield"],
                  updateValues: [newShield],
                },
              });
            }
          }

        },
      },
    },
    torbjorn: {
      ability1: {
        audioFile: "torbjorn-turret",
        run() {
          // Wait for user click
          return new Promise((resolve, reject) => {
            // When a row is clicked
            $(".row").on("click", (e) => {
              // Get target information & remove onclick
              const targetRow = $(e.target).closest(".row").attr("id");
              $(".row").off("click");

              // Check target is valid
              if (targetRow[0] === "p" || parseInt(targetRow[0]) === playerNum) {
                reject("Incorrect target");
                return;
              }

              // Apply effect
              const effectId = 'torbjornEnemyEffect';
              const heroId = 'torbjorn';
              dispatch({
                type: ACTIONS.ADD_ROW_EFFECT,
                payload: {
                  targetRow: targetRow,
                  playerHeroId: `${playerNum}${heroId}`,
                  effectId: effectId,
                },
              });

              resolve();
            });
          });
        },
      },
      ability2: {
        audioFile: "torbjorn-ult",
        synergyCost: 3,
        run() {
          const newTurretDamage = 2;
          const heroId = `${playerNum}torbjorn`;

          dispatch({
            type: ACTIONS.EDIT_CARD,
            payload: {
              playerNum: playerNum,
              targetCardId: heroId,
              editKeys: ['effects.torbjornEnemyEffect.value'],
              editValues: [newTurretDamage],
            }
          });
        }
      },
      torbjornEnemyEffect: {
        run(rowId) {
          console.log(`enemyplayer is ${enemyPlayerNum}`)
          console.log(gameState.playerCards[`player${enemyPlayerNum}cards`].cards)
          // Get enemies in target row
          const targetPlayer = parseInt(rowId[0]);
          const torbPlayer = targetPlayer === 1 ? 2 : 1;
          const rowEnemies = gameState.rows[rowId].cardIds.filter(cardId => {
            if (gameState.playerCards[`player${targetPlayer}cards`].cards[cardId].health > 0) {
              return cardId;
            } else return null;
          });
          console.log(rowEnemies)

          const turretDamage = gameState.playerCards[`player${torbPlayer}cards`].cards[
            `${torbPlayer}torbjorn`].effects.torbjornEnemyEffect.value;
          const maxTargets = 2;

          // If there are no enemies in the target row, do nothing
          if (rowEnemies.length === 0) {
            return;
          
            // If there is just one enemy, attach that enemy once
          } else if (rowEnemies.length === 1) {
            applyDamage(turretDamage, rowEnemies[0], rowId);

          // If there are several enemies, attack two at random
          } else if (rowEnemies.length >= 2) {
            const attackedEnemies = [];
            
            for (let i = 0; i < maxTargets; i++) {
              let target;
              do {
                target = helper.getRandInt(0, rowEnemies.length);
              } while (attackedEnemies.includes(target))
              console.log(`target is ${target}`)
              applyDamage(turretDamage, rowEnemies[target], rowId)
              attackedEnemies.push(target);
            }
          }
        },
      },
    },
    tracer: {
      ability1: {
        audioFile: "tracer-smarts",
        maxTargets: 2,
        run() {
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              // Get target info
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetPlayerNum = parseInt(targetCardId[0]);
              const targetRow = $(e.target).closest(".row").attr("id");

              // Remove onclick
              $(".card").off("click");

              // Check target is valid
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) === playerNum
              ) {
                reject("Incorrect target");
                return;
              }

              // Apply damage to the target card (includes setting state)
              const damageValue = 1;
              applyDamage(damageValue, targetCardId, targetRow);

              resolve();
            });
          });
        },
      },
      ability2: {
        audioFile: "tracer-imback",
        synergyCost: 2,
      },
    },
    widowmaker: {
      ability1: {
        audioFile: "widowmaker-noonecanhide-fr",
        run() {
          // Wait for user click
          return new Promise((resolve, reject) => {
            // When a row is clicked
            $(".row").on("click", (e) => {
              
              // Get target information
              const targetRow = $(e.target).closest(".row").attr("id");
              
              // Remove the onclick
              $(".row").off("click");
              
              // Check target is valid
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) === playerNum
                ) {
                  reject("Incorrect target");
                  return;
                }
                
                // Effect id
                const effectId = 'widowmakerEnemyEffect';
                // Apply effect
                dispatch({
                type: ACTIONS.ADD_ROW_EFFECT,
                payload: {
                  targetRow: targetRow,
                  playerHeroId: `${playerNum}widowmaker`,
                  effectId: effectId,
                },
              });

              resolve();
            });
          });
        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: "widowmaker-oneshot",
        run() {
          // Wait for user click
          return new Promise((resolve, reject) => {
            // When card is chosen as target by being clicked on
            $(".card").on("click", (e) => {
              // Get target information
              const targetCardId = $(e.target).closest(".card").attr("id");
              const enemyPlayer = parseInt(targetCardId[0]);
              const targetRow = $(e.target).closest(".row").attr("id");

              // Remove onclick event
              $(".card").off("click");

              // Check valid target
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) === playerNum
              ) {
                reject("Incorrect target row");
                return;
              }

              // Apply abilities that affect a specific card
              dispatch({
                type: ACTIONS.EDIT_CARD,
                payload: {
                  playerNum: enemyPlayer,
                  targetCardId: targetCardId,
                  editKeys: ["health"],
                  editValues: [0],
                },
              });

              resolve();
            });
          });
        },
      },
    },
    winston: {
      ability1: {
        audioFile: "winston-barrier",
        run() {
          // Apply shield to row
          const shieldValue = 3;
          dispatch({
            type: ACTIONS.ADD_ROW_EFFECT,
            payload: {
              targetRow: rowId,
              rowShield: shieldValue,
            },
          });
        },
      },
      ability2: {
        audioFile: "winston-angry",
        synergyCost: 3,
      },
    },
    wreckingball: {
      ability1: {
        audioFile: "wreckingball-shields",
      },
      ability2: {
        audioFile: "wreckingball-ult",
      },
    },
    zarya: {
      ability1: {
        audioFile: "zarya-barrier",
        run() {
          // Wait for user click
          return new Promise((resolve, reject) => {
            // When a row is clicked
            $(".card").on("click", (e) => {
              // Get target information
              const targetCard = $(e.target).closest(".card").attr("id");
              const targetRow = $(e.target).closest(".row").attr("id");

              // Remove the onclick
              $(".card").off("click");

              // Check target is valid
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) !== playerNum
              ) {
                reject("Incorrect target");
                return;
              }

              // Apply effect
              const shieldValue = 3;
              dispatch({
                type: ACTIONS.UPDATE_CARD,
                payload: {
                  playerNum: playerNum,
                  cardId: targetCard,
                  updateKeys: ["shield"],
                  updateValues: [shieldValue],
                },
              });

              resolve();
            });
          });
        },
      },
      ability2: {
        audioFile: "zarya-ult",
        synergyCost: 3,
      },
    },
    zenyatta: {
      ability1: {
        maxTargets: 1,
        audioFile: "zenyatta-harmony",
        run() {
          // Wait for user click
          return new Promise((resolve, reject) => {
            // When a row is clicked
            $(".card").on("click", (e) => {
              // Get target information & remove onclick
              const targetCardId = $(e.target).closest(".card").attr("id");
              $(".card").off("click");
              const targetRow = $(e.target).closest(".row").attr("id");
              const targetPlayer = parseInt(targetCardId[0]);

              // Check target is valid
              if (targetRow[0] === "p") {
                reject("Incorrect target");
                return;
              }

              // Apply ally/enemy effect depending on which card was clicked
              let effectId;
              targetPlayer === playerNum ? effectId = 'zenyattaAllyEffect' :
              effectId = 'zenyattaEnemyEffect';

              // Harmony orb applies healing immediately, as well as over time
              if (effectId === 'zenyattaAllyEffect') {
                const healingValue = 1;
                applyHealing(healingValue, targetCardId);
              }

              // Set state
              dispatch({
                type: ACTIONS.ADD_CARD_EFFECT,
                payload: {
                  targetCardId: targetCardId,
                  playerHeroId: `${playerNum}zenyatta`,
                  effectId: effectId,
                },
              });

              resolve();
            });
          });
        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: "zenyatta-ult",
        run() {},
      },
      zenyattaAllyEffect: {
        run(cardId) {
          const healingValue = 1;

          applyHealing(healingValue, cardId);

          return;
        },
      },
    },
  };

  // Handle the calling of hero abilites, including checking the ability call is valid
  async function activateAbility1(e) {
    e.stopPropagation();
    const maxTargets = abilities[heroId].ability1.maxTargets;
    unsetCardFocus();

    // TODO: Check any effects that trigger on ability usage

    // Check that the card is not in the player's hand
    if (rowId[0] !== "p") {
      // Call the relevant hero's ability
      try {
        // Play ability audio if exists
        if ("audioFile" in abilities[heroId].ability1) {
          const audioFile = abilities[heroId].ability1.audioFile;
          const ability1audio = new Audio(
            require(`assets/audio/${audioFile}.mp3`).default
          );
          ability1audio.play();
        }

        // Allow the ability to be triggered more than once if relevant
        let i = 0;
        do {
          await abilities[heroId].ability1.run();
          unsetCardFocus();
          i++;
        } while ("maxTargets" in abilities[heroId].ability1 && i < maxTargets);

        // Set ability as used
        dispatch({
          type: ACTIONS.EDIT_CARD,
          payload: {
            playerNum: playerNum,
            targetCardId: playerHeroId,
            editKeys: ["ability1Used"],
            editValues: [true],
          },
        });
      } catch (err) {
        alert(err);
      }
    } else alert("Play cards before using abilities!");
  }

  async function activateAbility2(e) {
    e.stopPropagation();
    // Get synergy values
    const synergyCost = abilities[heroId].ability2.synergyCost;
    const rowSynergy = gameState.rows[rowId].synergy;
    unsetCardFocus();

    // TODO: Check any effects that trigger on ability usage

    // Check that the card is not in the player's hand
    if (rowId[0] !== "p") {
      // Check there is sufficient synergy to use the ability
      if (rowSynergy >= synergyCost) {
        // Call the relevant hero's ability and deduct synergy
        try {
          // Play ability audio if exists
          if ("audioFile" in abilities[heroId].ability2) {
            const audioFile = abilities[heroId].ability2.audioFile;
            const ability2audio = new Audio(
              require(`assets/audio/${audioFile}.mp3`).default
            );
            ability2audio.play();
          }

          // Allow multiple targets if applicable
          const maxTargets = abilities[heroId].ability2.maxTargets;
          let i = 0;
          do {
            await abilities[heroId].ability2.run();
            i++;
          } while (
            "maxTargets" in abilities[heroId].ability2 &&
            i < maxTargets
          );

          // Subtract ability synergy cost from row synergy
          // Make synergy negative so that the cost is subtracted, not added
          dispatch({
            type: ACTIONS.UPDATE_SYNERGY,
            payload: {
              rowId: rowId,
              synergyCost: Math.abs(synergyCost) * -1,
            },
          });

          // Set ability as used
          dispatch({
            type: ACTIONS.EDIT_CARD,
            payload: {
              playerNum: playerNum,
              targetCardId: playerHeroId,
              editKeys: ["ability2Used"],
              editValues: [true],
            },
          });
        } catch (err) {
          alert(err);
        }
      } else alert("Insufficient synergy!");
    } else alert("Play cards before using abilities!");
  }

  
  // Apply card effects every turn
  useEffect(() => {
    console.log(`turn is ${turnState.playerTurn}`)

    // Check the turn count has increased - ensures effects only trigger once per turn
    if (turnState.turnCount > turnRef.current.turnCount) {
      
      // Identify player row ids
      const playerTurn = turnState.playerTurn;
      const playerRowIds = [`${playerTurn}b`, `${playerTurn}m`, `${playerTurn}f`];

      // Get all effects currently applied to rows and cards
      // Run each 'turnstart' effect on each row
      for (let rowId of playerRowIds) {
        const allyRowEffects = gameState.rows[rowId].allyEffects;
        const enemyRowEffects = gameState.rows[rowId].enemyEffects;

        // Run ally row effects
        for (let effect of allyRowEffects) {
          if (effect.on === 'turnstart') {
            abilities[effect.hero][effect.id].run(rowId);
            console.log(`running ${effect.id} on ${rowId}`)
          }
        }

        // Run ally card effects
        for (let cardId of gameState.rows[rowId].cardIds) {
          const cardEffects = gameState.playerCards[`player${playerTurn}cards`].cards[cardId].allyEffects;
          for (let effect of cardEffects) {
            if (effect.on === 'turnstart') {
              console.log(`running ${JSON.stringify(effect)} on ${rowId}`)
              abilities[effect.hero][effect.id].run(cardId);
            }
          }
        }

        // Run enemy row effects
        for (let effect of enemyRowEffects) {
          if (effect.on === 'turnstart') {
            abilities[effect.hero][effect.id].run(rowId);
            console.log(`running ${effect.id} on ${rowId}`)
          }
        }

        // Run enemy card effects
        for (let cardId of gameState.rows[rowId].cardIds) {
          const cardEffects = gameState.playerCards[`player${playerTurn}cards`].cards[cardId].enemyEffects;
          for (let effect of cardEffects) {
            if (effect.on === 'turnstart') {
              console.log(`running ${JSON.stringify(effect)} on ${rowId}`)
              abilities[effect.hero][effect.id].run(cardId);
            }
          }
        }
      }
    }

    // Update ref to current turn
    turnRef.current.turnCount = turnState.turnCount;
  },[turnState, gameState.playerCards, gameState.rows]);

  return (
    <div id="abilitiescontainer">
      {"ability1" in abilities[heroId] &&
        currentCard.ability1Used === false && (
          <div
            id="ability1"
            className="ability ability1"
            onClick={activateAbility1}
          ></div>
        )}
      {"ability2" in abilities[heroId] &&
        currentCard.ability2Used === false && (
          <div
            id="ability2"
            className="ability ability2"
            onClick={activateAbility2}
          ></div>
        )}
    </div>
  );
}
