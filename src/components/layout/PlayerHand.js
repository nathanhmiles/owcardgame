import React, { useContext } from "react";
import CardDisplay from "components/layout/CardDisplay";
import gameContext from "context/gameContext";
import turnContext from "context/turnContext";
import data from "data";
import getRandInt from "helper";
import { ACTIONS } from "App";

export default function PlayerHand(props) {
  // Context
  const { gameState, dispatch } = useContext(gameContext);
  const { turnState, setTurnState } = useContext(turnContext);

  // Variables
  const playerNum = parseInt(props.playerNum);
  const playerHandId = `player${playerNum}hand`;
  const playerCardsId = `player${playerNum}cards`;
  const handCards = gameState.rows[playerHandId].cardIds;
  const nextCardDraw = props.nextCardDraw;
  const setNextCardDraw = props.setNextCardDraw;

  // Draws one random card and puts the card into the player's hand
  function drawCards(nextCardDraw) {
    // Draw specific card designated by nextCardDraw state
    if (nextCardDraw[`player${playerNum}`] !== null) {
      dispatch({
        type: ACTIONS.CREATE_CARD,
        payload: {
          playerNum: playerNum,
          heroId: nextCardDraw[`player${playerNum}`],
        },
      });
      var playerHeroId = `${playerNum}${nextCardDraw[`player${playerNum}`]}`;
      setNextCardDraw((prevState) => ({
        ...prevState,
        [`player${playerNum}`]: null,
      }));

      // Draw a random card id, then check if it was already drawn, if so draw again
    } else {
      let newCardId;
      do {
        const randInt = getRandInt(0, Object.keys(data.heroes).length);
        const randKey = Object.keys(data.heroes)[randInt];
        newCardId = data.heroes[randKey].id;
        playerHeroId = `${props.playerNum}${newCardId}`;
      } while (
        playerHeroId in gameState.playerCards[playerCardsId].cards ||
        data.heroes[newCardId].isImplemented === false
      );
      dispatch({
        type: ACTIONS.CREATE_CARD,
        payload: { playerNum: playerNum, heroId: newCardId },
      });
    }

    // Add new card to player hand
    dispatch({
      type: ACTIONS.ADD_CARD_TO_HAND, payload: { 
        playerNum: playerNum, 
        playerHeroId: playerHeroId,
      },
    });
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
          onClick={
            turnState.playerTurn === 1
              ? () =>
                  setTurnState((prevState) => ({
                    ...prevState,
                    turnCount: prevState.turnCount + 1,
                    playerTurn: 2,
                  }))
              : () =>
                  setTurnState((prevState) => ({
                    ...prevState,
                    turnCount: prevState.turnCount + 1,
                    playerTurn: 1,
                  }))
          }
        >
          End Turn
        </button>
      </div>
        <button
          disabled={(!(gameState.rows[`player${playerNum}hand`].cardsPlayed >= 6) || 
            turnState[`player${playerNum}Passed`] === true)}
          className="passbutton"
          onClick={() => {setTurnState(prevState => ({
            ...prevState,
            [`player${playerNum}Passed`]: true,
          }))}}
        >
          Pass
        </button>
    </div>
  );
}
