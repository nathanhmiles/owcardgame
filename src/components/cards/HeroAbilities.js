import React, { useContext } from "react";
import gameContext from "context/gameContext";
import $ from "jquery";

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

  function setRowSynergy(rowId, synergyCost) {
    /*
    // Using immutability helper below breaks health updates
    const newSynState = update(gameState, {
      rows: {[rowId]: {synergy: {$apply: (prevSyn) => {return prevSyn - synergyCost}}}}
    });
    
    setGameState((prevState) => (newSynState));
    */

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
      ability1: {
        run() {
          console.log("widow ability1 started");
          return new Promise((resolve, reject) => {
            $(".row").on("click", (e) => {
              const targetRow = $(e.target).closest(".row").attr("id");
              console.log(targetRow);

              const abilityResult = {
                type: "row",
                rowId: targetRow,
                rowKey: "effects",
                rowValue: "2widowmaker",
              };

              $(".row").off("click");
              if (targetRow[0] !== "p") {
                setGameState((prevState) => ({
                  ...prevState,
                  rows: {
                    ...prevState.rows,
                    [abilityResult.rowId]: {
                      ...prevState.rows[abilityResult.rowId],
                      [abilityResult.rowKey]: [
                        ...prevState.rows[abilityResult.rowId][
                          abilityResult.rowKey
                        ],
                        abilityResult.rowValue,
                      ],
                    },
                  },
                }));
                resolve(abilityResult);
              } else {
                reject("Can't target player hand");
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
              if (targetRow[0] === "p") {
                reject("Cant target player's hand");
              }
              const abilityResult = {
                type: "card",
                targetCardId: targetCardId,
                cardKey: "health",
                cardValue: 0,
                targetRow: targetRow,
              };

              $(".card").off("click");
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
                        [abilityResult.cardKey]: abilityResult.cardValue,
                      },
                    },
                  },
                },
              }));

              
              resolve(abilityResult);
            });
          });
        },
      },
    },
  };

  // Handle the calling of hero abilites, including checking the ability call is valid
  async function activateAbility1(e) {
    e.stopPropagation();

    // Check that the card is not in the player's hand
    if (rowId[0] !== "p") {
      // Call the relevant hero's ability
      try {
        unsetCardFocus();
        await abilities[heroId].ability1.run();
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
