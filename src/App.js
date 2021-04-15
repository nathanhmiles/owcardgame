import React, { useState, useReducer, useEffect, useRef } from "react";
import gameContext from "context/gameContext";
import turnContext from "context/turnContext";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import "./1300.css";
import "./760.css";
import PlayerHalf from "components/layout/PlayerHalf";
import TitleCard from "components/layout/TitleCard";
import Footer from "components/layout/Footer";
import CardFocus from "components/cards/CardFocus";
import AudioPlayer from "components/layout/AudioPlayer";
import MatchCounter from "components/layout/MatchCounter";
import data from "data";
import getRandInt, {PlayerCard} from "helper";
import produce from "immer";
import _ from "lodash";

export const ACTIONS = {
  ADD_CARD_EFFECT: "add-card-effect",
  ADD_CARD_TO_HAND: "add-card-to-hand",
  ADD_ROW_EFFECT: "add-row-effect",
  ADD_ROW_SHIELD: "add-row-shield",
  CREATE_CARD: "create-card",
  DAMAGE_ROW_SHIELD: "damage-row-shield",
  DISCARD_CARD: "discard-card",
  EDIT_CARD: "edit-card",
  EDIT_ROW: "edit-row",
  MOVE_CARD: "move-card",
  REMOVE_EFFECTS: "remove-effects",
  SET_POWER: "set-power",
  SET_SYNERGY: "set-synergy",
  UPDATE_CARD: "update-card",
  UPDATE_POWER: "update-power",
  UPDATE_ROW: "update-row",
  UPDATE_SYNERGY: "update-synergy",
};

function reducer(gameState, action) {
  switch (action.type) {
    // Add hero effect to a card
    case ACTIONS.ADD_CARD_EFFECT: {
      return produce(gameState, (draft) => {
        // Payload info
        const targetCardId = action.payload.targetCardId;
        const targetPlayer = targetCardId[0];
        const playerHeroId = action.payload.playerHeroId;
        const effectId = action.payload.effectId;

        // Get effect object from state
        const playerNum = parseInt(playerHeroId[0]);
        const cardEffect =
          gameState.playerCards[`player${playerNum}cards`].cards[playerHeroId]
            .effects[effectId];

        return produce(gameState, (draft) => {
          if (cardEffect.player === "ally") {
            draft.playerCards[`player${targetPlayer}cards`].cards[
              targetCardId
            ].allyEffects.push(cardEffect);
          } else if (cardEffect.player === "enemy") {
            draft.playerCards[`player${targetPlayer}cards`].cards[
              targetCardId
            ].enemyEffects.push(cardEffect);
          }
        });
      });
    }

    // Add hero effect to a row
    case ACTIONS.ADD_ROW_EFFECT: {
      // Payload info
      const targetRow = action.payload.targetRow;
      const playerHeroId = action.payload.playerHeroId;
      const effectId = action.payload.effectId;
      const playerNum = parseInt(playerHeroId[0]);
      // Get effect object from state
      const rowEffect =
        gameState.playerCards[`player${playerNum}cards`].cards[playerHeroId]
          .effects[effectId];

      return produce(gameState, (draft) => {
        if (rowEffect.player === "ally") {
          draft.rows[targetRow].allyEffects.push(rowEffect);
        } else if (rowEffect.player === "enemy") {
          draft.rows[targetRow].enemyEffects.push(rowEffect);
        }
      });
    }

    // Add shield value to row
    case ACTIONS.ADD_ROW_SHIELD: {
      const playerHeroId = action.payload.playerHeroId;
      const targetRow = action.payload.targetRow;
      const rowShield = action.payload.rowShield;
      
      // If hero already added shield to row, increase shield, else set shield
      return produce(gameState, draft => {
        draft.rows[targetRow].shield.push(
          {playerHeroId: playerHeroId, shieldValue: rowShield}
        );
      });
    }

    // Add a created card in to the player's hand
    case ACTIONS.ADD_CARD_TO_HAND: {
      const playerNum = action.payload.playerNum;
      const playerHeroId = action.payload.playerHeroId;

      return produce(gameState, (draft) => {
        draft.rows[`player${playerNum}hand`].cardIds.push(playerHeroId);
      });
    }

    // Adds a card to player's cards (doesn't add to a row)
    case ACTIONS.CREATE_CARD: {
      const playerNum = action.payload.playerNum;
      const heroId = action.payload.heroId;
      const newCard = new PlayerCard(playerNum, heroId);

      // Add new card to playercards data (does not add the card to any row)
      // Call Move_Card to make card visible
      return produce(gameState, (draft) => {
        draft.playerCards[`player${playerNum}cards`].cards[
          newCard.playerHeroId
        ] = newCard;
      });
    }

    // Damage a row's shields
    case ACTIONS.DAMAGE_ROW_SHIELD: {
      const targetRow = action.payload.targetRow;
      const rowShieldDamage = action.payload.rowShieldDamage;

      console.log(`applying ${rowShieldDamage} damage to row ${targetRow}`)

      return produce(gameState, draft => {
        const targetRowShieldArr = draft.rows[targetRow].shield;
        let damageDone = 0;

        // Reduce shield of each shieldEntry in the array until 0, then move on to the next until full damage is done
        outer:    // Use labeled break to break out of both loops if full damage has been done
        for (let x = 0; x < targetRowShieldArr.length; x++) {
          for (let i = 0; i < rowShieldDamage; i++) {
            if (damageDone === rowShieldDamage) break outer;
            
            targetRowShieldArr[x].shieldValue -= 1;
            damageDone += 1;

            console.log(`${targetRowShieldArr[x].playerHeroId}'s shield is now ${targetRowShieldArr[x].shieldValue}`)
          }
        }
        
        // Delete entries in shield array if their shieldValue has been reduced to 0
        for (let x = 0; x < targetRowShieldArr.length; x++) {
          if (targetRowShieldArr[x].shieldValue === 0) {
            targetRowShieldArr.splice(x, 1);
          } 
        }
      });
    }

    // Discard a card
    case ACTIONS.DISCARD_CARD: {
      const targetCardId = action.payload.targetCardId;
      const targetCardRow = action.payload.targetCardRow;
      const playerNum = parseInt(targetCardId[0]);

      // Identify affected card, mark as discarded, and remove from relevant row
      return produce(gameState, (draft) => {
        draft.playerCards[`player${playerNum}cards`].cards[targetCardId].isDiscarded = true;
        draft.rows[targetCardRow].cardIds = draft.rows[targetCardRow].cardIds.filter(
          (cardId) => cardId !== targetCardId
        );
      });
    }

    // Replace a value
    case ACTIONS.EDIT_CARD: {
      // Required variables
      const playerNum = action.payload.playerNum;
      const targetCardId = action.payload.targetCardId;
      const editKeys = action.payload.editKeys;
      const editValues = action.payload.editValues;

      // Identify affected card and apply all edits
      return produce(gameState, (draft) => {
        let targetCard =
          draft.playerCards[`player${playerNum}cards`].cards[targetCardId];

          // Use lodash to set object properties (allows a string to be used for a nested object path)
        for (let i = 0; i < editKeys.length; i++) {
          _.set(targetCard, editKeys[i], editValues[i]);
        }
      });
    }

    // Replaces existing values with new values
    case ACTIONS.EDIT_ROW: {
      const targetRow = action.payload.targetRow;
      const editKeys = action.payload.editKeys;
      const editValues = action.payload.editValues;

      // Identify affected card and apply all edits
      return produce(gameState, (draft) => {
        for (let i = 0; i < editKeys.length; i++) {
          draft.rows[targetRow][editKeys[i]] = editValues[i];
        }
      });
    }

    // Moves a card within or between rows
    case ACTIONS.MOVE_CARD: {
      // Variables from payload
      const targetCardId = action.payload.targetCardId;
      const startRowId = action.payload.startRowId;
      const startIndex = action.payload.startIndex;
      const finishRowId = action.payload.finishRowId;
      const finishIndex = action.payload.finishIndex;

      // Variables from game state
      const startRow = gameState.rows[startRowId];
      const finishRow = gameState.rows[finishRowId];

      // Move card within same row
      if (startRowId === finishRowId) {
        const rowId = startRowId;
        const row = startRow;
        const newCardIds = Array.from(row.cardIds);
        newCardIds.splice(startIndex, 1);
        newCardIds.splice(finishIndex, 0, targetCardId);

        return produce(gameState, (draft) => {
          draft.rows[rowId].cardIds = newCardIds;
        });
      }

      // Moving from one row to another
      const newStartRowCardIds = Array.from(startRow.cardIds);
      newStartRowCardIds.splice(startIndex, 1);

      const newFinishRowCardIds = Array.from(finishRow.cardIds);
      newFinishRowCardIds.splice(finishIndex, 0, targetCardId);

      return produce(gameState, (draft) => {
        draft.rows[startRowId].cardIds = newStartRowCardIds;
        draft.rows[finishRowId].cardIds = newFinishRowCardIds;
      });
    }

    // Sets player power
    case ACTIONS.SET_POWER: {
      const playerNum = action.payload.playerNum;
      const rowPosition = action.payload.rowPosition;
      const powerValue = action.payload.powerValue;

      return produce(gameState, (draft) => {
        draft.rows[`player${playerNum}hand`].power[rowPosition] = powerValue;
      });
    }

    // Sets row synergy
    case ACTIONS.SET_SYNERGY: {
      const rowId = action.payload.rowId;
      const newSynergyVal = action.payload.newSynergyVal;

      return produce(gameState, (draft) => {
        draft.rows[rowId].synergy = newSynergyVal;
      });
    }

    // Update value based on previous value
    case ACTIONS.UPDATE_CARD: {
      // Required variables
      const playerNum = action.payload.playerNum;
      const cardId = action.payload.cardId;
      const updateKeys = action.payload.updateKeys;
      const updateValues = action.payload.updateValues;

      // Identify affected card and apply all updates
      return produce(gameState, (draft) => {
        let targetCard =
          draft.playerCards[`player${playerNum}cards`].cards[cardId];

        for (let i = 0; i < updateKeys.length; i++) {
          targetCard[updateKeys[i]] += updateValues[i];
        }
      });
    }

    // Updatesrow synergy
    case ACTIONS.UPDATE_POWER: {
      // Required variables
      const targetPlayer = action.payload.targetPlayer;
      const targetRow = action.payload.targetRow;
      const powerValue = action.payload.powerValue;

      // Update synergy and set value, minimum of 0 synergy
      return produce(gameState, (draft) => {
        let rowPower = draft.rows[`player${targetPlayer}hand`].power[targetRow];
        rowPower += powerValue;
        const newPower = Math.max(0, rowPower);
        draft.rows[`player${targetPlayer}hand`].power[targetRow] = newPower;
      });
    }

    // Update value based on previous value
    case ACTIONS.UPDATE_ROW: {
      // Required variables
      const playerNum = action.payload.playerNum;
      const targetRow = action.payload.targetRow;
      const updateKeys = action.payload.updateKeys;
      const updateValues = action.payload.updateValues;

      // Identify affected card and apply all updates
      return produce(gameState, (draft) => {
        for (let i = 0; i < updateKeys.length; i++) {
          draft.rows[targetRow][updateKeys[i]] += updateValues[i];
        }
      });
    }

    // Sets row synergy
    case ACTIONS.UPDATE_SYNERGY: {
      // Required variables
      const rowId = action.payload.rowId;
      const synergyCost = action.payload.synergyCost;

      // Update synergy and set value, minimum of 0 synergy
      return produce(gameState, (draft) => {
        let rowSynergy = draft.rows[rowId].synergy;
        rowSynergy += synergyCost;
        const newSynergy = Math.max(0, rowSynergy);
        draft.rows[rowId].synergy = newSynergy;
      });
    }

    default:
      return gameState;
  }
}

export default function App() {
  const [gameState, dispatch] = useReducer(reducer, data);

  const [matchState, setMatchState] = useState({
    player1: { wins: 0 },
    player2: { wins: 0 },
    wonLastRound: 0,
  });
  const [turnState, setTurnState] = useState({
    turnCount: 1,
    playerTurn: getRandInt(1, 3),
    player1Passed: false,
    player2Passed: false,
  });
  const [cardFocus, setCardFocus] = useState(null);
  const [nextCardDraw, setNextCardDraw] = useState({
    player1: null,
    player2: null,
  });

  // References for setting state inside useEffects
  let matchRef = useRef(null);
 
  // End the round and update match scores when both players have passed their turn
  useEffect(() => {
    // Set ref to current match state, alter ref within endRound(), then call setMatchState once using ref as new state
    matchRef.current = matchState;
    
    // End the round, calculate who won, update score and move to next round
    const endRound = () => {
      // Get power data
      const totalPower1 = gameState.rows.player1hand.totalPower();
      const totalPower2 = gameState.rows.player2hand.totalPower();

      // Get player rows info
      const player1Rows = [
        gameState.rows["1b"],
        gameState.rows["1m"],
        gameState.rows["1f"],
      ];
      const player2Rows = [
        gameState.rows["2b"],
        gameState.rows["2m"],
        gameState.rows["2f"],
      ];

      // Calculate winning player
      let winningPlayer = 0;

      if (totalPower1 > totalPower2) winningPlayer = 1;
      else if (totalPower2 > totalPower1) winningPlayer = 2;
      // If power is tied, remaining synergy decides the winner
      else if (totalPower1 === totalPower2) {
        let player1Synergy = 0;
        let player2Synergy = 0;

        for (let row of player1Rows) {
          player1Synergy += row.synergy;
        }
        for (let row of player2Rows) {
          player2Synergy += row.synergy;
        }

        if (player1Synergy > player2Synergy) winningPlayer = 1;
        else if (player2Synergy > player1Synergy) winningPlayer = 2;
        // If remaining synergy is also tied, it is a draw, denoted by setting player 3 as the winner
        else winningPlayer = 3;
      }

      // Reset turn state
      // Winner of last round goes first next round. If round was a draw, random player goes first
      setTurnState((prevState) => ({
        turnCount: 1,
        playerTurn: winningPlayer === 3 ? prevState.playerTurn : winningPlayer === 1 ? 1 : 2,
        player1Passed: false,
        player2Passed: false,
      }));

      // Update match state
      // Update state if round is a draw
      if (winningPlayer === 3) {
        alert("Round is a draw! Both players receive a win.");

        // Add a win to both players' record for a draw
        matchRef.current.player1.wins += 1;
        matchRef.current.player2.wins += 1;

        // If players have drawn both rounds and so both have two wins, match is a draw
        if (matchState.player1.wins === 2 && matchState.player2.wins === 2) {
          alert("The match is a draw!");
          alert("Starting a new match.");
          window.location.reload();
        }

      // Update state for whichever player won
      } else {
        // Add a win to winner's record
        matchRef.current[`player${winningPlayer}`].wins += 1;
        matchRef.current.wonLastRound = winningPlayer;
        alert(`Player ${winningPlayer} wins the round!`);


      }

        
      // Discard all cards
      // Set ids of rows to be reset
      const player1RowIds = ["1b", "1m", "1f"];
      const player2RowIds = ["2b", "2m", "2f"];

      // Get card ids from every player 1 row
      let player1Cards = [];
      for (let id of player1RowIds) {
        player1Cards.push(gameState.rows[id].cardIds);
      }

      // Get card ids from every player 2 row
      let player2Cards = [];
      for (let id of player2RowIds) {
        player2Cards.push(gameState.rows[id].cardIds);
      }

      // Reset power, synergy, effects and discard player 1 cards
      for (let i = 0; i < player1Cards.length; i++) {
        dispatch({
          type: ACTIONS.EDIT_ROW,
          payload: {
            targetRow: player1RowIds[i],
            editKeys: ["synergy", "shield", "allyEffects", "enemyEffects"],
            editValues: [0, [], [], []],
          },
        });
        for (let x = 0; x < player1Cards[i].length; x++) {
          dispatch({
            type: ACTIONS.DISCARD_CARD,
            payload: {
              playerNum: 1,
              targetCardId: player1Cards[i][x],
              targetCardRow: player1RowIds[i],
            },
          });
        }
      }
      dispatch({
        type: ACTIONS.EDIT_ROW,
        payload: {
          targetRow: "player1hand",
          editKeys: ["cardsPlayed", "power"],
          editValues: [0, { f: 0, m: 0, b: 0 }],
        },
      });

      // Reset power, synergy, effects and discard player 2 cards
      for (let i = 0; i < player2Cards.length; i++) {
        dispatch({
          type: ACTIONS.EDIT_ROW,
          payload: {
            targetRow: player2RowIds[i],
            editKeys: ["synergy", "shield", "allyEffects", "enemyEffects"],
            editValues: [0, [], [], []],
          },
        });
        for (let x = 0; x < player2Cards[i].length; x++) {
          dispatch({
            type: ACTIONS.DISCARD_CARD,
            payload: {
              playerNum: 2,
              targetCardId: player2Cards[i][x],
              targetCardRow: player2RowIds[i],
            },
          });
        }
      }

      dispatch({
        type: ACTIONS.EDIT_ROW,
        payload: {
          targetRow: "player2hand",
          editKeys: ["cardsPlayed", "power"],
          editValues: [0, { f: 0, m: 0, b: 0 }],
        },
      });

      // Set new match state using the ref that was mutated
      setMatchState(matchRef.current);

      // TODO: create a play again button
      // If a player has reached two wins, end the match and reload the page for a new match
      if (matchState["player1"].wins === 2) {
        alert("Player 1 wins the match!");
        alert("Starting a new match.");
        window.location.reload();
      } else if (matchState["player2"].wins === 2) {
        alert("Player 2 wins the match!");
        alert("Starting a new match.");
        window.location.reload();
      }

    }
    // When both players pass, end the round and move to the next round
    if (turnState.player1Passed === true && turnState.player2Passed === true) {
      endRound();
    }
  }, [turnState, gameState.rows, matchState]);



  // Handle card dragging 
  function handleOnDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // Get card movement data
    const startRowId = source.droppableId;
    const finishRowId = destination.droppableId;
    const playerNum = parseInt(finishRowId[0]);
    const finishPosition = finishRowId[1];
    const heroId = draggableId.slice(1, draggableId.length);
    let finishSynergy = gameState.rows[finishRowId].synergy;

    // Apply card movement
    dispatch({
      type: ACTIONS.MOVE_CARD,
      payload: {
        targetCardId: draggableId,
        startRowId: startRowId,
        finishRowId: finishRowId,
        startIndex: source.index,
        finishIndex: destination.index,
      },
    });

    // If not moving card within player's hand (i.e. moving into a row),
    // Set new row synergy and set card to played
    if (finishRowId[0] !== "p") {
      // Play intro audio
      try {
        const introAudio = new Audio(
          require(`assets/audio/${heroId}-intro.mp3`).default
        );
        introAudio.play();
      } catch (err) {
        console.log("No intro audio available");
      }

      // Set new row synergy
      const addSynergy =
        gameState.playerCards[`player${playerNum}cards`].cards[draggableId]
          .synergy[finishPosition];

      dispatch({
        type: ACTIONS.UPDATE_SYNERGY,
        payload: {
          rowId: finishRowId,
          synergyCost: addSynergy,
        },
      });

      // Set card as played and reduce synergy to 0 (so future moves dont also add synergy)
      dispatch({
        type: ACTIONS.EDIT_CARD,
        payload: {
          playerNum: playerNum,
          targetCardId: draggableId,
          editKeys: ["isPlayed", "synergy"],
          editValues: [true, { f: 0, m: 0, b: 0 }],
        },
      });

      // Keep track of how many cards have been played
      dispatch({
        type: ACTIONS.UPDATE_ROW,
        payload: {
          targetRow: `player${playerNum}hand`,
          updateKeys: ["cardsPlayed"],
          updateValues: [1],
        },
      });
    }
    return;
  }
  
  return (
    <div>
      <turnContext.Provider value={{ turnState, setTurnState }}>
        <gameContext.Provider value={{ gameState, dispatch }}>
          <Footer />
          <a 
            rel="noopener noreferrer" 
            target="_blank" 
            href={require('assets/how-to-play.pdf').default}
            id="howtoplay"
          >How to Play</a>
          <TitleCard />
          <AudioPlayer />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <PlayerHalf
              playerNum={2}
              setCardFocus={setCardFocus}
              nextCardDraw={nextCardDraw}
              setNextCardDraw={setNextCardDraw}
            />
            <div id="center-section">
              <MatchCounter playerNum={2} matchState={matchState} />
              <MatchCounter playerNum={1} matchState={matchState} />
            </div>
            <PlayerHalf
              playerNum={1}
              setCardFocus={setCardFocus}
              nextCardDraw={nextCardDraw}
              setNextCardDraw={setNextCardDraw}
            />
          </DragDropContext>
          {cardFocus !== null && 
            <CardFocus
              setCardFocus={setCardFocus}
              unsetCardFocus={() => {
                setCardFocus('invisible');
                console.log(`cardfocus is ${JSON.stringify(cardFocus)}`)
              }}
              cardFocus={cardFocus}
              setNextCardDraw={setNextCardDraw}
            />
          }
          
          <Footer />
        </gameContext.Provider>
      </turnContext.Provider>
    </div>
  );
}
