import React, { useContext } from "react";
import update from "immutability-helper";
import CardDisplay from "components/layout/CardDisplay";
import data from "data";
import gameContext from "context/gameContext";
import helper from "helper";

export default function PlayerHand(props) {
  // Context
  const { gameState, setGameState } = useContext(gameContext);

  // Variables
  const playerHandId = `player${props.playerNum}hand`;
  const playerCardsId = `player${props.playerNum}cards`;
  const handCards = gameState.rows[playerHandId].cardIds;

  // Creates a card with its own health and id unique to the playerCard, returns player-specific ID
  function createPlayerCard(playerNum, heroId) {
    // Get card values
    const {
      id,
      name,
      health,
      power,
      synergy,
      ability1,
      ability2,
      effect,
    } = data.heroes[heroId];
    const maxHealth = health;
    const playerHeroId = `${playerNum}${heroId}`;
    const shieldValue = 0;
    const enemyEffects = [];
    const allyEffects = [];
    const isDiscarded = false;

    // Combine values into one new hero object and assign to relevant player
    const newCard = {
      playerHeroId,
      id,
      name,
      health,
      maxHealth,
      power,
      synergy,
      shieldValue,
      ability1,
      ability2,
      effect,
      enemyEffects,
      allyEffects,
      isDiscarded,
    };
    
    const newState = update(gameState, {
      playerCards: {
        [`player${playerNum}cards`]: {
          cards: { [playerHeroId]: { $set: newCard } },
        },
      },
    });

    setGameState(newState);

    /*
    setGameState((prevState) => ({
      ...prevState,
      playerCards: {
        ...prevState.playerCards,
        [`player${playerNum}cards`]: {
          ...prevState.playerCards[`player${playerNum}cards`],
          cards: {
            ...prevState.playerCards[`player${playerNum}cards`].cards,
            [playerHeroId]: newCard,
          },
        },
      },
    }));
    */

    // return player-specific id to be used elsewhere
    return playerHeroId;
  }

  // Draws one random card and puts the card into the player's hand
  function drawCards() {
    // TODO: specify number of cards to draw?
    // Draw a random card id, then check if it was already drawn, if so draw again
    do {
      const randInt = helper.getRandInt(0, Object.keys(data.heroes).length);
      const randKey = Object.keys(data.heroes)[randInt];
      const newCardId = data.heroes[randKey].id;
      // Create the player-specific card using the random id and get player-specific id
      var playerHeroId = createPlayerCard(props.playerNum, newCardId);
    } while (playerHeroId in gameState.playerCards[playerCardsId].cards);

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
      <button
        disabled={handCards.length >= 6}
        style={{ width: "50px", height: "50px" }}
        onClick={drawCards}
      >
        Draw
      </button>
    </div>
  );
}
