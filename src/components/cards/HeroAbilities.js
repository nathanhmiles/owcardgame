import React, { useContext } from "react";
import gameContext from "context/gameContext";
import turnContext from "context/turnContext";
import $ from "jquery";

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

  // Abilities data
  const abilities = {
    genji: {
      ability1: {
        maxTargets: 3,
        run() {
          return new Promise((resolve, reject) => {
            $(".card").on("click", (e) => {
              const targetCardId = $(e.target).closest(".card").attr("id");
              const targetPlayer = targetCardId[0];
              const targetRow = $(e.target).closest(".row").attr("id");

              $(".card").off("click");
              // Check target is valid
              if (targetRow[0] === "p" || targetRow[0] === playerNum) {
                reject("Incorrect target");
                return;
              }
              const cardKey = "health";
              const cardValue = -1;
              // Apply abilities that affect a specific card

              setGameState((prevState) => ({
                ...prevState,
                playerCards: {
                  ...prevState.playerCards,
                  [`player${targetPlayer}cards`]: {
                    ...prevState.playerCards[`player${targetPlayer}cards`],
                    cards: {
                      ...prevState.playerCards[`player${targetPlayer}cards`]
                        .cards,
                      [targetCardId]: {
                        ...prevState.playerCards[`player${targetPlayer}cards`]
                          .cards[targetCardId],
                        [cardKey]:
                          prevState.playerCards[`player${targetPlayer}cards`]
                            .cards[targetCardId][cardKey] + cardValue,
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
              const targetPlayer = targetCardId[0];
              const targetRow = $(e.target).closest(".row").attr("id");
              
              // Remove the onclick effect from all cards
              $(".card").off("click");
              // Check target is valid
              if (
                targetRow[0] === "p" ||
                targetRow[0] === playerNum ||
                // Check target has been damaged
                gameState.playerCards[`player${targetPlayer}cards`].cards[
                  targetCardId
                ].health ===
                  gameState.playerCards[`player${targetPlayer}cards`].cards[
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
                  [`player${targetPlayer}cards`]: {
                    ...prevState.playerCards[`player${targetPlayer}cards`],
                    cards: {
                      ...prevState.playerCards[`player${targetPlayer}cards`]
                        .cards,
                      [targetCardId]: {
                        ...prevState.playerCards[`player${targetPlayer}cards`]
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

    widowmaker: {
      ability1: {
        maxTargets: 1,
        run() {
          console.log("widow ability1 started");
          return new Promise((resolve, reject) => {
            $(".row").on("click", (e) => {
              const targetRow = $(e.target).closest(".row").attr("id");
              console.log(targetRow);

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
              const targetPlayer = targetCardId[0];
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
                  [`player${targetPlayer}cards`]: {
                    ...prevState.playerCards[`player${targetPlayer}cards`],
                    cards: {
                      ...prevState.playerCards[`player${targetPlayer}cards`]
                        .cards,
                      [targetCardId]: {
                        ...prevState.playerCards[`player${targetPlayer}cards`]
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
        
        // Allow the ability to be triggered more than once if relevant
        let i = 0;
        do {
          await abilities[heroId].ability1.run();
          console.log(`ability1-${i} done`);
          i += 1;
        } while (i < maxTargets);
        
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
          await abilities[heroId].ability2.run();
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
