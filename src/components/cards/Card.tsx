import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import gameContext from '../../context/gameContext';
import turnContext from '../../context/turnContext';
import CardEffects from './CardEffects';
import HealthCounter from '../counters/HealthCounter';
import ShieldCounter from '../counters/ShieldCounter';
import {RowId} from "../../types/data.interface";
import {SetCardFocusFn} from "../../types/hero-card.interface";

interface CardProps {
    playerHeroId: string;
    playerNum: number;
    rowId: RowId;
    index: number;
    setCardFocus: SetCardFocusFn;
}

export default function Card(props: CardProps) {
    // Context
    const { gameState, dispatch } = useContext(gameContext);
    const { turnState, setTurnState } = useContext(turnContext);
    const [imageLoaded, setImageLoaded] = useState('');

    // Variables
    const { playerHeroId, playerNum, rowId, index } = props;
    const playerCardsId = `player${playerNum}cards`;
    const rowPosition = rowId[1];

    // Get card attributes from relevant player
    const {
        id,
        name,
        health,
        power,
        synergy,
        shield,
        enemyEffects,
        allyEffects,
        isPlayed,
        isDiscarded,
    } = gameState.playerCards[playerCardsId].cards[playerHeroId];

    function getStyle(style, snapshot) {
        if (!snapshot.isDropAnimating) return style;
        return {
            ...style,
            transitionDuration: '0.001s',
        };
    }

    return isDiscarded ? null : (
        <Draggable
            draggableId={playerHeroId}
            index={index}
            isDragDisabled={isPlayed || turnState.playerTurn !== playerNum}
        >
            {(provided, snapshot) => (
                <div className={`cardcontainer`}>
                    <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${
                            snapshot.isDragging ? 'dragging' : 'not-dragging'
                        }`}
                        ref={provided.innerRef}
                        style={getStyle(
                            provided.draggableProps.style,
                            snapshot
                        )}
                    >
                        {playerNum === 2 ? (
                            <CardEffects
                                type='enemy'
                                effects={enemyEffects}
                                rowId={rowId}
                                setCardFocus={props.setCardFocus}
                            />
                        ) : (
                            <CardEffects
                                type='ally'
                                effects={allyEffects}
                                rowId={rowId}
                                setCardFocus={props.setCardFocus}
                            />
                        )}
                        <div
                            id={`${playerHeroId}`}
                            className={`card ${health > 0 ? 'alive' : 'dead'}`}
                            onClick={
                                turnState.playerTurn === playerNum || isPlayed
                                    ? () => {
                                          props.setCardFocus({
                                              playerHeroId: playerHeroId,
                                              rowId: rowId,
                                          });
                                      }
                                    : null
                            }
                        >
                            {imageLoaded === playerHeroId &&
                                (turnState.playerTurn === playerNum ||
                                isPlayed ? (
                                    <HealthCounter
                                        type='cardcounter'
                                        health={health}
                                    />
                                ) : null)}
                            {turnState.playerTurn === playerNum || isPlayed
                                ? shield > 0 && (
                                      <ShieldCounter
                                          type='cardcounter'
                                          shield={shield}
                                      />
                                  )
                                : null}
                            <img
                                onLoad={() => setImageLoaded(playerHeroId)}
                                src={
                                    turnState.playerTurn === playerNum ||
                                    isPlayed
                                        ? require(`assets/heroes/cards/${id}.webp`)
                                              .default
                                        : require('assets/heroes/cards/card-back.webp')
                                              .default
                                }
                                className={`cardimg ${
                                    turnState.playerTurn === playerNum ||
                                    isPlayed
                                        ? 'show-card'
                                        : 'hide-card'
                                }`}
                                alt={`${name} Card`}
                            />
                        </div>
                        {playerNum === 2 ? (
                            <CardEffects
                                type='ally'
                                effects={allyEffects}
                                rowId={rowId}
                                setCardFocus={props.setCardFocus}
                            />
                        ) : (
                            <CardEffects
                                type='enemy'
                                effects={enemyEffects}
                                rowId={rowId}
                                setCardFocus={props.setCardFocus}
                            />
                        )}
                    </li>
                </div>
            )}
        </Draggable>
    );
}
