import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GameCard = ({
  gameId,
  isPlaying,
  participants,
  gameTitle,
  thumbnail,
  enterGame
}) => (
  <GameCardWrapper
    onClick={() => enterGame(gameId)}
    thumbnail={thumbnail}
  >
    <h1>{gameTitle}</h1>
    <GameStatus>
      <h3>{isPlaying ? 'Playing' : 'Available'}</h3>
      <h3>{participants.length} players</h3>
    </GameStatus>
  </GameCardWrapper>
);

const GameCardWrapper = styled.div`
  padding: 1rem;
  border: 0.3rem solid black;
  height: 100%;
  width: 24rem;
  background: url(${props => props.thumbnail});
  background-size: cover;
  text-align: center;
  color: white;

  & h1 {
    margin-top: 2rem;
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

const GameStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10rem;
`;

GameCard.propTypes = {
  gameId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  participants: PropTypes.array.isRequired,
  gameTitle: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  enterGame: PropTypes.func.isRequired,
};

export default GameCard;
