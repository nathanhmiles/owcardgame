import React, { useContext, useEffect, useRef } from "react";
import gameContext from "context/gameContext";
import turnContext from "context/turnContext";
import $ from "jquery";
import { ACTIONS } from "App";

export default function HeroAbilities(props) {
  // Context
  const { gameState, dispatch } = useContext(gameContext);
  const { turnState, setTurnState } = useContext(turnContext);

  // Variables
  const playerNum = parseInt(props.playerNum);
  const playerHeroId = props.playerHeroId;
  const heroId = playerHeroId.slice(1, playerHeroId.length);
  const rowId = props.rowId;
  const unsetCardFocus = props.unsetCardFocus;

  // Need useRef to keep track of card health during async ability usages
  // TODO: later if implementing more built in controls, such as only allowing
  // TODO: user to affect cards in a specific row, create another ref to track
  // TODO: row target info and reference it during the hero's ability call
  let targetRef = useRef(null);

  // Ensures targetRef only contains values during ability usage,
  // Reset to empty object when rerendering (i.e. when ability is finished)
  useEffect(() => {
    targetRef.current = {};
  });

  // Applies damage to either shields or health as needed, returning both the shield and health value
  // TODO: currently only damage has its own function that sets state, all other state
  // TODO: is set within the hero's ability
  function applyDamage(damageValue, targetCardId, targetRow) {
    // Identify enemy player
    const targetPlayerNum = targetCardId[0];

    // Get hero health and shield values
    let targetHealth =
      gameState.playerCards[`player${targetPlayerNum}cards`].cards[targetCardId]
        .health;
    let targetShield =
      gameState.playerCards[`player${targetPlayerNum}cards`].cards[targetCardId]
        .shield;
    let targetRowShield = gameState.rows[targetRow].shield;

    // If the target has already been targeted during this ability, update with current values
    // Needed because gameState is only updated once the entire ability is finished, so
    // we need useRef in order to keep track of the damaged hero's new changing value
    if (targetCardId in targetRef.current) {
      targetHealth = targetRef.current[targetCardId].health;
      targetShield = targetRef.current[targetCardId].shield;
    }
    if (targetRow in targetRef.current) {
      targetRowShield = targetRef.current[targetRow].shield;
    }
    
    // Initialise ref
    targetRef.current[targetCardId] = {};

    // Decrement the target's health/shield/rowshield as needed
    for (let i = 0; i < damageValue; i++) {
      // Damage row shield before all else
      if (targetRowShield > 0) {
        targetRowShield -= 1;
        
        targetRef.current[targetRow] = {};
        targetRef.current[targetRow]["shield"] = targetRowShield;
        
        dispatch({
          type: ACTIONS.EDIT_ROW,
          payload: {
            targetRow: targetRow,
            rowShield: targetRowShield,
          },
        });
        return;
        // Damage hero shield before health
      } else if (targetShield > 0) {
        targetShield -= 1;
        targetRef.current[targetCardId]["shield"] = targetShield;
      // Damage hero health
      } else {
        targetHealth -= 1;
        targetRef.current[targetCardId]["health"] = targetHealth;
        targetHealth = Math.max(0, targetHealth);   // Dont allow health to be a negative number
      }
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

  function applyHealing() {
    // TODO
  }

  // Abilities data
  const abilities = {
    ana: {
      ability1: {
        audioFile: "ana-grenade",
      },
      ability2: {
        synergyCost: 3,
        audioFile: "ana-ult",
      },
    },
    ashe: {
      ability1: {
        audioFile: "ashe-deadlockgang",
      },
      ability2: {
        synergyCost: 3,
        audioFile: "ashe-bob",
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
            type: ACTIONS.EDIT_CARD,
            payload: {
              playerNum: playerNum,
              targetCardId: `${playerNum}dvameka`,
              editKeys: ["isDiscarded"],
              editValues: [true],
            },
          });

          // Remove dvameka card from row (still exists in playercards)
          // TODO: not actually implemented yet - need to set new row state using the below
          const newRowCards = gameState.rows[rowId].cardIds.filter(
            (cardId) => cardId !== `${playerNum}dvameka`
          );

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
              dispatch({
                type: ACTIONS.ADD_ROW_EFFECT,
                payload: {
                  targetRow: targetRow,
                  rowEffect: `${playerNum}hanzo`,
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
      },
      ability2: {
        audioFile: "lucio-ult",
        synergyCost: 3,
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
              if (targetCardRow[0] === "p" || parseInt(targetCardRow[0]) === playerNum) {
                reject("Incorrect target row");
                return;
              } 

              // Reduce synergy of target row
              dispatch({
                type: ACTIONS.UPDATE_SYNERGY,
                payload: {
                  rowId: targetCardRow,
                  synergyCost: (Math.abs(rowEnemies) * -1),
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
      },
      ability2: {
        audioFile: "mercy-ult",
        synergyCost: 3,
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
              if (targetCardRow[0] === "p" || parseInt(targetCardRow[0]) === playerNum) {
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
          // Discard dvameka card
          dispatch({
            type: ACTIONS.EDIT_CARD,
            payload: {
              playerNum: playerNum,
              targetCardId: `${playerNum}reaper`,
              editKeys: ["isDiscarded"],
              editValues: [true],
            },
          });

          // Remove dvameka card from row (still exists in playercards)
          // TODO: not actually implemented yet - need to set new row state using the below
          const newRowCards = gameState.rows[rowId].cardIds.filter(
            (cardId) => cardId !== `${playerNum}reaper`
          );

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
              if (targetCardRow[0] === "p" || parseInt(targetCardRow[0]) === playerNum) {
                reject("Incorrect target row");
                return;
              }

              // Move target to front row
              const newRowId = `${enemyPlayer}f`
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
            $(".card").on("click", (e) => {
              const targetRow = $(e.target).closest(".row").attr("id");

              $(".card").off("click");

              // Check target is valid
              if (
                targetRow[0] === "p" ||
                parseInt(targetRow[0]) === playerNum
              ) {
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

              // Find all cards in the target row
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
      },
      ability2: {
        audioFile: "soldier-ult",
        synergyCost: 3,
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
      },
      ability2: {
        audioFile: "symmetra-shield",
        synergyCost: 3,
      },
    },
    torbjorn: {
      ability1: {
        audioFile: "torbjorn-turret",
      },
      ability2: {
        audioFile: "torbjorn-ult",
        synergyCost: 3,
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

              // Apply effect
              dispatch({
                type: ACTIONS.ADD_ROW_EFFECT,
                payload: {
                  targetRow: targetRow,
                  rowEffect: `${playerNum}widowmaker`,
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
        run() {},
      },
      ability2: {
        synergyCost: 3,
        audioFile: "zenyatta-ult",
        run() {},
      },
    },
  };

  // Handle the calling of hero abilites, including checking the ability call is valid
  async function activateAbility1(e) {
    e.stopPropagation();
    const maxTargets = abilities[heroId].ability1.maxTargets;
    unsetCardFocus();

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
        } catch (err) {
          alert(err);
        }
      } else alert("Insufficient synergy!");
    } else alert("Play cards before using abilities!");
  }

  return (
    <div id="abilitiescontainer">
      {"ability1" in abilities[heroId] && (
        <div
          id="ability1"
          className="ability ability1"
          onClick={activateAbility1}
        ></div>
      )}
      <div
        id="ability2"
        className="ability ability2"
        onClick={activateAbility2}
      ></div>
    </div>
  );
}
