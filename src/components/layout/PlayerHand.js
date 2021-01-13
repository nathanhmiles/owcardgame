import React, { useContext } from "react";
import Card from "components/cards/Card";
import CardDisplay from "components/layout/CardDisplay";
import data from "data";
import { Droppable, Draggable } from "react-beautiful-dnd";
import rowsContext from "context/rowsContext";
import playerCardsContext from "context/playerCardsContext";

export default function PlayerHand(props) {
  // Context
  const { rowsState, setRowsState } = useContext(rowsContext);
  const { playerCards, setPlayerCards } = useContext(playerCardsContext);

  // Variables
  const playerHandId = `player${props.playerNum}hand`;
  const playerCardsId = `player${props.playerNum}cards`;
  const handCards = rowsState[playerHandId].cardIds;

  // Helper function - returns random number between min (inc) and max (exc)
  function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Creates a card with its own health and id unique to the playerCard, returns player-specific ID
  function createPlayerCard(playerNum, heroId) {
    // Get card values
    const { id, health } = data.heroes[heroId];
    const playerHeroId = `${playerNum}${heroId}`;
    const shieldValue = 0;
    const isDiscarded = false;

    // Combine values into one new hero object and assign to relevant player
    const newCard = { playerHeroId, id, health, shieldValue, isDiscarded };
    setPlayerCards({
      ...playerCards,
      [playerCardsId]: {
        ...playerCards[playerCardsId],
        cards: {
          ...playerCards[playerCardsId].cards,
          [playerHeroId]: { ...newCard },
        },
      },
    });
    // return player-specific id to be used elsewhere
    return playerHeroId;
  }

  // Draws one random card and puts the card into the player's hand
  function drawCards() {
    // TODO: specify number of cards to draw?
    // Draw a random card id, then check if it was already drawn, if so draw again
    do {
      const randInt = getRandInt(0, Object.keys(data.heroes).length);
      const randKey = Object.keys(data.heroes)[randInt];
      const newCardId = data.heroes[randKey].id;
      // Create the player-specific card using the random id and get player-specific id
      var playerHeroId = createPlayerCard(props.playerNum, newCardId);
    } while (playerHeroId in playerCards[playerCardsId].cards);

    // Create updated array and update state
    const newCardIds = [...rowsState[playerHandId].cardIds, playerHeroId];
    setRowsState({
      ...rowsState,
      [playerHandId]: {
        ...rowsState[playerHandId],
        cardIds: newCardIds,
      },
    });
  }

  return (
    <div className="playerhand row">
      <CardDisplay
        playerNum={props.playerNum}
        droppableId={`player${props.playerNum}hand`}
        listClass={"handlist"}
        rowId={playerHandId}
      />
      <button style={{ width: "50px", height: "50px" }} onClick={drawCards}>
        Draw
      </button>
    </div>
  );
}
