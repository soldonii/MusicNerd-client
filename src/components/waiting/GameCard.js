import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import * as SC from './waiting.styles';

const GameCard = ({
  gameId,
  isPlaying,
  players,
  gameTitle,
  thumbnailUrl,
  enterGame
}) => {
  const dispatch = useDispatch();

  return (
    <SC.GameCard.GameCardWrapper
      onClick={() => dispatch(enterGame(gameId))}
      thumbnailUrl={thumbnailUrl}
    >
      <h1>{gameTitle}</h1>
      <SC.GameCard.GameStatus>
        <h3>{isPlaying ? 'Playing' : 'Available'}</h3>
        <h3>{players.length} players</h3>
      </SC.GameCard.GameStatus>
    </SC.GameCard.GameCardWrapper>
  );
};

GameCard.propTypes = {
  gameId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  players: PropTypes.array.isRequired,
  gameTitle: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  enterGame: PropTypes.func.isRequired,
};

export default GameCard;
