import React, { useContext } from "react";
import update from "immutability-helper";
import CardDisplay from "components/layout/CardDisplay";
import data from "data";
import gameContext from "context/gameContext";
import turnContext from "context/turnContext";
import helper from "helper";

export default function PlayerHand(props) {
  // Context
  const { gameState, setGameState } = useContext(gameContext);
  const { turnState, setTurnState } = useContext(turnContext);

  // Variables
  const playerNum = props.playerNum;
  const playerHandId = `player${playerNum}hand`;
  const playerCardsId = `player${playerNum}cards`;
  const handCards = gameState.rows[playerHandId].cardIds;
  const nextCardDraw = props.nextCardDraw;
  const setNextCardDraw = props.setNextCardDraw;

  console.log(props.nextCardDraw)

  // Calls the create card function and adds to hand
  function addNewCardToHand(playerNum, heroId) {
    
    const newCard = helper.createPlayerCard(playerNum, heroId);

    const newState = update(gameState, {
      playerCards: {
        [`player${playerNum}cards`]: {
          cards: { [newCard.playerHeroId]: { $set: newCard } },
        },
      },
    });

    setGameState(newState);

    // return player-specific id to be used elsewhere
    return newCard.playerHeroId;
  }

  // Draws one random card and puts the card into the player's hand
  function drawCards(nextCardDraw) {
    // TODO: specify number of cards to draw?
    if (nextCardDraw[`player${playerNum}`] !== null) {
      // Draw specific card designated by nextCardDraw state
      var playerHeroId = addNewCardToHand(playerNum, nextCardDraw[`player${playerNum}`]);
      setNextCardDraw(prevState => ({
        ...prevState,
        [`player${playerNum}`]: null,
      }));
    } else {
      // Draw a random card id, then check if it was already drawn, if so draw again
      do {
        const randInt = helper.getRandInt(0, Object.keys(data.heroes).length);
        const randKey = Object.keys(data.heroes)[randInt];
        const newCardId = data.heroes[randKey].id;
        // Create the player-specific card using the random id and get player-specific id
        playerHeroId = addNewCardToHand(props.playerNum, newCardId);
      } while (playerHeroId in gameState.playerCards[playerCardsId].cards);
    }

    // Create updated array and update state
    const newCardIds = [...gameState.rows[playerHandId].cardIds, playerHeroId];
    setGameState((prevState) => ({
      ...prevState,
      rows: {
        ...prevState.rows,
        [playerHandId]: {
          ...prevState.rows[playerHandId],
          cardIds: newCardIds,
        },
      },
    }));
  }

  return (
    <div className="playerhand cardRow">
      <CardDisplay
        playerNum={props.playerNum}
        droppableId={`player${props.playerNum}hand`}
        listClass={"handlist"}
        rowId={playerHandId}
        setCardFocus={props.setCardFocus}
      />
      <div className="playerbuttons">
      <button
        className="drawbutton"
        disabled={handCards.length >= 8}
        onClick={() => drawCards(nextCardDraw)}
      >
        Draw
      </button>
      <button 
        disabled={!(turnState.playerTurn === playerNum)} 
        className="endturnbutton"
        onClick={turnState.playerTurn === 1 ? (
          () => setTurnState(prevState => ({
            turnCount: (prevState.turnCount + 1),
            playerTurn: 2,
          }))) : (
          () => setTurnState(prevState => ({
            turnCount: (prevState.turnCount + 1),
            playerTurn: 1,
          }))
          )
        }
      >
        End Turn
      </button>
      </div>
    </div>
  );
}
