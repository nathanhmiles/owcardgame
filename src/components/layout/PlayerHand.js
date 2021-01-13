import React, { useContext } from 'react';
import Card from 'components/cards/Card';
import data from 'data';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import rowsContext from 'context/rowsContext';
import playerCardsContext from 'context/playerCardsContext';

export default function PlayerHand(props) {
  // Context
  const { rowsState, setRowsState } = useContext(rowsContext);
  const { playerCards, setPlayerCards } = useContext(playerCardsContext);

  // Variables
  const playerHandId = `player${props.playerNum}hand`;
  const playerCardsId = `player${props.playerNum}cards`;
  const handCards = rowsState[playerHandId].cardIds;
  
  // returns random number between min (inc) and max (exc)
  function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Creates a card with its own health and id unique to the playerCard, returns unique ID
  function createPlayerCard(playerNum, heroId) {
    
    const { id, health } = data.heroes[heroId];
    
    // Create values unique to that card not stored in data
    const playerHeroId = `${playerNum}${heroId}`;
    const shieldValue = 0;
    const isDiscarded = false;

    // Combine values into one new hero object and assign to relevant player
    const newCard = {playerHeroId, id, health, shieldValue, isDiscarded};
    
    setPlayerCards({
      ...playerCards,
      [playerCardsId]: {
        ...playerCards[playerCardsId],
        cards: {
          ...playerCards[playerCardsId].cards,
          [playerHeroId]: {...newCard}
        }
      }
    })

    return playerHeroId;
  }

  // TODO: randomly add a specificed number of cards from heroes to hand
  // TODO: check if card already drawn/discarded by that player
  function drawCards() {
    // Draw a random card id, then check if it was already drawn, if so draw again
    do {
      const randInt = getRandInt(0, Object.keys(data.heroes).length);
      const randKey = Object.keys(data.heroes)[randInt];
      const newCardId = data.heroes[randKey].id;
      // Create the player-specific card using the random id 
      var playerHeroId = createPlayerCard(props.playerNum, newCardId);
    }
    while (playerHeroId in playerCards[playerCardsId].cards);
    

    const newCardIds = [...rowsState[playerHandId].cardIds, playerHeroId];
    setRowsState({
      ...rowsState,
      [playerHandId]: {
        ...rowsState[playerHandId],
        cardIds: newCardIds
      }
    });
  }

  return(
    <div className="playerhand">
    
      <Droppable droppableId={`player${props.playerNum}hand`} direction="horizontal">
      {(provided) => (
        <ul className="handlist" {...provided.droppableProps} ref={provided.innerRef}>
          {handCards && handCards.map((cardId, index) => {
            return(
              <Draggable key={cardId} draggableId={cardId} index={index}>
                {(provided) => (
                  <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Card playerHeroId={cardId} playerNum={props.playerNum} />
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
      
      </Droppable>
    <button style={{width: '50px', height: '50px'}} onClick={drawCards}>Draw</button>
    </div>
  ); 
}