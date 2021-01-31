import React, { useContext } from "react";
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
  const playerCardsId = `player${playerNum}cards`;
  const rowId = props.rowId;
  const cardFocus = props.cardFocus;
  const setCardFocus = props.setCardFocus;
  const unsetCardFocus = props.unsetCardFocus;

  // Applies damage to either shields or health as needed, returning both the shield and health value
  function applyDamage(damageValue, targetId) {
    const targetPlayerNum = targetId[0];

    let targetHealth =
      gameState.playerCards[`player${targetPlayerNum}cards`].cards[targetId]
        .health;
    let targetShield =
      gameState.playerCards[`player${targetPlayerNum}cards`].cards[targetId]
        .shield;

    for (let i = 0; i < damageValue; i++) {
      if (targetShield > 0) {
        targetShield -= 1;
      } else {
        targetHealth -= 1;
      }
    }

    targetHealth = Math.max(0, targetHealth);

    return { targetHealth, targetShield };
  }

  // Abilities data
  const abilities = {
    ana: {
      ability1: {
        audioFile: 'ana-grenade',
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'ana-ult',
      },
    },
    ashe: {
      ability1: {
        audioFile: 'ashe-deadlockgang',
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'ashe-bob',
      },
    },
    baptiste: {
      ability1: {
        audioFile: 'baptiste-notover',
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'baptiste-immortality',
      },
    },
    bastion: {
      ability1: {

      },
      ability2: {
        synergyCost: 3,
        audioFile: 'bastion-ult',
      },
    },
    bob: {
      ability1: {

      },
      ability2: {
        synergyCost: 1,
      },
    },
    brigitte: {
      ability1: {
        audioFile: 'brigitte-armour',
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'brigitte-ult',
      },
    },
    doomfist: {
      ability1: {
        audioFile: 'doomfist-punch',
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'doomfist-ult',
      },
    },
    dva: {
      ability2: {
        synergyCost: 2,
        audioFile: 'dva-ult',
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
        audioFile: 'dvameka-apm',
        run() {
          // Add shield to dvameka card
          const newShield = 2;
          dispatch({type: ACTIONS.UPDATE_CARD, payload: {
            playerNum: playerNum,
            cardId: `${playerNum}dvameka`,
            updateKeys: ['shield'],
            updateValues: [newShield]
          }});

        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'dvameka-nerfthis',
        run() {
          const rowPosition = rowId[1];
          const enemyPlayer = playerNum === 1 ? 2 : 1;
          const playerRowCardIds = gameState.rows[rowId].cardIds;
          const enemyPlayerRowCardIds =
            gameState.rows[`${enemyPlayer}${rowPosition}`].cardIds;
          const dvamekaIndex = $(`#${playerNum}dvameka`).closest("li").index();

          const damageValue = 4;

          // Damage own player cards
          for (let cardId of playerRowCardIds) {
            const { targetHealth, targetShield } = applyDamage(
              damageValue,
              cardId
            );

            console.log('ally damage calculated')

            dispatch({type: ACTIONS.EDIT_CARD, payload: {
              playerNum: playerNum,
              targetCardId: cardId,
              editKeys: ['health', 'shield'],
              editValues: [targetHealth, targetShield],
            }});

            console.log('allies damage applied')
          }

          // Damage enemy cards
          for (let cardId of enemyPlayerRowCardIds) {
            const { targetHealth, targetShield } = applyDamage(
              damageValue,
              cardId
            );

              console.log('enemy damage calculated');

            dispatch({type: ACTIONS.EDIT_CARD, payload: {
              playerNum: enemyPlayer,
              targetCardId: cardId,
              editKeys: ['health', 'shield'],
              editValues: [targetHealth, targetShield],
            }});
          }

          // After effects
          
          // Discard dvameka card
          dispatch({type: ACTIONS.EDIT_CARD, payload: {
            playerNum: playerNum,
            targetCardId: `${playerNum}dvameka`,
            editKeys: ['isDiscarded'],
            editValues: [true],
          }});

          // Remove dvameka card from row (still exists in playercards)
          const newRowCards = gameState.rows[rowId].cardIds.filter(
            (cardId) => cardId !== `${playerNum}dvameka`
          );
          
          // Create baby dva card
          dispatch({type: ACTIONS.CREATE_CARD, payload: {
            playerNum: playerNum,
            heroId: 'dva',
          }});

          // Add baby dva to row dvameka was in
          dispatch({type: ACTIONS.ADD_CARD_TO_HAND, payload: {
            playerNum: playerNum,
            playerHeroId: `${playerNum}dva`,
          }});

          // Get Dva's index in player hand
          const dvaIndex = $(`#${playerNum}dva`).closest('li').index();

          // Move dva from player hand to dvameka's former position
          dispatch({type: ACTIONS.MOVE_CARD, payload: {
            targetCardId: `${playerNum}dva`,
            startRowId: `player${playerNum}hand`,
            finishRowId: rowId,
            startIndex: dvaIndex,
            finishIndex: dvamekaIndex,
          }})

          
        },
      },
    },
    echo: {
      ability1: {

      },
      ability2: {
        synergyCost: 2,
      },
    },
    genji: {
      ability1: {
        maxTargets: 3,
        audioFile: 'genji-cutting',
        run() {
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              const targetCardId = $(e.target).closest(".card").attr("id");
              const enemyPlayer = parseInt(targetCardId[0]);
              const targetRow = $(e.target).closest(".row").attr("id");

              console.log(targetRow);
              $(".card").off("click");
              // Check target is valid
              if (targetRow[0] === "p" || parseInt(targetRow[0]) === playerNum) {
                reject("Incorrect target");
                return;
              }

              const { targetHealth, targetShield } = applyDamage(1, targetCardId);
              
              // Apply abilities that affect a specific card
              dispatch({type: ACTIONS.EDIT_CARD, payload: {
                playerNum: enemyPlayer,
                targetCardId: targetCardId,
                editKeys: ['health', 'shield'],
                editValues: [targetHealth, targetShield],
              }});

              resolve('shuriken thrown!');
            });
          });
        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'genji-ult',
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
              dispatch({type: ACTIONS.EDIT_CARD, payload: {
                playerNum: enemyPlayer,
                targetCardId: targetCardId,
                editKeys: ['health'],
                editValues: [0],
              }});

              resolve();
            });
          });
        },
      },
    },
    hanzo: {
      ability1: {
        audioFile: 'hanzo-marked',
      },
      ability2: {
        audioFile: 'hanzo-ult',
        synergyCost: 3,
      },
    },
    junkrat: {
      ability1: {
        audioFile: 'junkrat-laugh',
      },
      ability2: {
        audioFile: 'junkrat-ult',
        synergyCost: 3,
      },
    },
    lucio: {
      ability1: {
        audioFile: 'lucio-ampitup',
      },
      ability2: {
        audioFile: 'lucio-ult',
        synergyCost: 3,
      },
    },
    mccree: {
      ability1: {
        audioFile: 'mccree-fishinabarrel',
      },
      ability2: {
        audioFile: 'mccree-ult',
        synergyCost: 3,
      },
    },
    mei: {
      ability1: {
        audioFile: 'mei-goticed',
      },
      ability2: {
        audioFile: 'mei-ult',
        synergyCost: 2,
      },
    },
    mercy: {
      ability1: {
        audioFile: 'mercy-medicalemergency',
      },
      ability2: {
        audioFile: 'mercy-ult',
        synergyCost: 3,
      },
    },
    moira: {
      ability1: {
        audioFile: 'moira-grasp',
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'moira-ult',
      },
    },
    orisa: {
      ability1: {
        audioFile: 'orisa-barrier',
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'orisa-ult',
      },
    },
    pharah: {
      ability1: {
        audioFile: 'pharah-clear',
        run() {
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetCardIndex = $(e.target).closest("li").index();
              const enemyPlayer = parseInt(targetCardId[0]);
              const targetCardRow = $(e.target).closest(".row").attr("id");

              $(".card").off("click");

              // Check target is valid
              if (targetCardRow[0] === "p" || parseInt(targetCardRow[0]) === playerNum) {
                
                reject("Incorrect target row");
                return;

              } else if (targetCardRow[1] !== "b") {
                
                // Move target back a row if not already in last row
                const newRowId = `${enemyPlayer}${
                  targetCardRow[1] === "f" ? "m" : "b"
                }`;

                dispatch({type: ACTIONS.MOVE_CARD, payload: {
                  targetCardId: targetCardId,
                  startRowId: targetCardRow,
                  finishRowId: newRowId,
                  startIndex: targetCardIndex,
                  finishIndex: 0,
                }});

              }

              // Reduce synergy of target row
              dispatch({type: ACTIONS.UPDATE_SYNERGY, payload: {
                  rowId: targetCardRow,
                  synergyCost: -2,
              }});

              resolve();
            });
          });
        },
      },
      ability2: {
        maxTargets: 3,
        synergyCost: 3,
        audioFile: 'pharah-ult',
        run() {
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              const targetCardId = $(e.target).closest(".card").attr("id");
              const enemyPlayer = parseInt(targetCardId[0]);
              const targetRow = $(e.target).closest(".row").attr("id");

              $(".card").off("click");
              // Check target is valid
              if (targetRow[0] === "p" || parseInt(targetRow[0]) === playerNum) {
                reject("Incorrect target");
                return;
              }

              const damageValue = 2;

              const { targetHealth, targetShield } = applyDamage(
                damageValue,
                targetCardId
              );

              // Apply abilities that affect a specific card
              dispatch({type: ACTIONS.EDIT_CARD, payload: {
                playerNum: enemyPlayer,
                targetCardId: targetCardId,
                editKeys: ['health', 'shield'],
                editValues: [targetHealth, targetShield],
              }});

              resolve();
            });
          });
        },
      },
    },
    reaper: {
      ability1: {
        audioFile: 'reaper-lastwords',
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'reaper-ult',
      },
    },
    reinhardt: {
      ability1: {
        audioFile: 'reinhardt-barrier',
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'reinhardt-ult',
      },
    },
    roadhog: {
      ability1: {
        audioFile: 'roadhog-hook',
      },
      ability2: {
        audioFile: 'roadhog-hogwild',
        synergyCost: 3,
      },
    },
    sigma: {
      ability1: {
        audioFile: 'sigma-barrier',
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'sigma-ult',
      },
    },
    soldier: {
      ability1: {
        audioFile: 'soldier-teamheal'
      },
      ability2: {
        audioFile: 'soldier-ult',
        synergyCost: 3,
      },
    },
    sombra: {
      ability1: {
        audioFile: 'sombra-hack'
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'sombra-ult',
      },
    },
    symmetra: {
      ability1: {
        audioFile: 'symmetra-teleporter',
      },
      ability2: {
        audioFile: 'symmetra-shield',
        synergyCost: 3,
      },
    },
    torbjorn: {
      ability1: {
        audioFile: 'torbjorn-turret',
      },
      ability2: {
        audioFile: 'torbjorn-ult',
        synergyCost: 3,
      },
    },
    tracer: {
      ability1: {
        audioFile: 'tracer-smarts',
      },
      ability2: {
        audioFile: 'tracer-imback',
        synergyCost: 2,
      },
    },
    widowmaker: {
      ability1: {
        audioFile: 'widowmaker-noonecanhide-fr',
        run() {
          return new Promise((resolve, reject) => {
            $(".row").on("click", (e) => {
              const targetRow = $(e.target).closest(".row").attr("id");

              $(".row").off("click");
              // Check target is valid
              if (targetRow[0] === "p" || parseInt(targetRow[0]) === playerNum) {
                reject("Incorrect target");
                return;
              }

              // Apply effect
              dispatch({type: ACTIONS.ADD_ROW_EFFECT, payload: {
                targetRow: targetRow,
                rowEffect: `${playerNum}widowmaker`
              }});
              
              resolve();
            });
          });
        },
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'widowmaker-oneshot',
        run() {
          console.log("widow ability2 started");
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              const targetCardId = $(e.target).closest(".card").attr("id");
              const enemyPlayer = parseInt(targetCardId[0]);
              const targetRow = $(e.target).closest(".row").attr("id");

              $(".card").off("click");
              if (targetRow[0] === "p" || parseInt(targetRow[0]) === playerNum) {
                reject("Incorrect target row");
                return;
              }
              
              // Apply abilities that affect a specific card
              dispatch({type: ACTIONS.EDIT_CARD, payload: {
                playerNum: enemyPlayer,
                targetCardId: targetCardId,
                editKeys: ['health'],
                editValues: [0],
              }});

              resolve();
            });
          });
        },
      },
    },
    winston: {
      ability1: {
        audioFile: 'winston-barrier',
      },
      ability2: {
        audioFile: 'winston-angry',
        synergyCost: 3,
      },
    },
    wreckingball: {
      ability1: {
        audioFile: 'wreckingball-shields',
      },
      ability2: {
        audioFile: 'wreckingball-ult',
      },
    },
    zarya: {
      ability1: {
        audioFile: 'zarya-barrier',
      },
      ability2: {
        audioFile: 'zarya-ult',
        synergyCost: 3,
      },
    },
    zenyatta: {
      ability1: {
        maxTargets: 1,
        audioFile: 'zenyatta-harmony',
        run() {},
      },
      ability2: {
        synergyCost: 3,
        audioFile: 'zenyatta-ult',
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

        // Play ability audio if exists
        if ('audioFile' in abilities[heroId].ability1) {
          const audioFile = abilities[heroId].ability1.audioFile;
          const ability1audio = new Audio(require(`assets/audio/${audioFile}.mp3`).default)
          ability1audio.play();
        }

        // Allow the ability to be triggered more than once if relevant
        if ("maxTargets" in abilities[heroId].ability1) {
          let i = 0;
          do {
            const ability1Result = await abilities[heroId].ability1.run();
            console.log(ability1Result);
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
    // Get synergy values
    const synergyCost = abilities[heroId].ability2.synergyCost;
    const rowSynergy = gameState.rows[rowId].synergy;
    
    // Check that the card is not in the player's hand
    if (rowId[0] !== "p") {
      // Check there is sufficient synergy to use the ability
      if (rowSynergy >= synergyCost) {
        // Call the relevant hero's ability and deduct synergy
        try {
          unsetCardFocus();
          
          // Play ability audio if exists
          if ('audioFile' in abilities[heroId].ability2) {
            const audioFile = abilities[heroId].ability2.audioFile;
            const ability2audio = new Audio(require(`assets/audio/${audioFile}.mp3`).default);
            console.log(ability2audio)
            ability2audio.play();
          }

          // Allow multiple targets if applicable
          if ("maxTargets" in abilities[heroId].ability2) {
            const maxTargets = abilities[heroId].ability2.maxTargets;
            let i = 0;
            do {
              await abilities[heroId].ability2.run();
              i += 1;
            } while (i < maxTargets);
          } else await abilities[heroId].ability2.run();
          
          // Subtract ability synergy cost from row synergy 
          // Make synergy negative so that the cost is subtracted, not added
          dispatch({
            type: ACTIONS.UPDATE_SYNERGY, payload: { 
              rowId: rowId, 
              synergyCost: (Math.abs(synergyCost) * -1) 
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
      {('ability1' in abilities[heroId]) && 
        <div
          id="ability1"
          className="ability ability1"
          onClick={activateAbility1}
        ></div>
      }
      <div
        id="ability2"
        className="ability ability2"
        onClick={activateAbility2}
      ></div>
    </div>
  );
}
