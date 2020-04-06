import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const GameCard = ({ gameId, isPlaying, participants, gameTitle, thumbnail }) => {
  const history = useHistory();
  const [ error, setError ] = useState('');

  const enterGameRoom = async () => {
    const { data: result, errorMessage } = await axios.put('http://localhost:8080/games', { gameId });
    if (result === 'success') {
      return history.push(`/games/${gameId}`);
    }

    setError(errorMessage);
  };

  useEffect(() => {
    console.log(error);
    if (error) {
      window.alert('해당 방에 입장할 수 없습니다.');
    }
  }, [ error ]);

  return (
    <GameCardWrapper
      onClick={enterGameRoom}
      thumbnail={thumbnail}
      data-id={gameId}
    >
      <h1>{gameTitle}</h1>
      <GameStatus>
        <h3>{isPlaying ? 'Playing' : 'Available'}</h3>
        <h3>{participants.length} players</h3>
      </GameStatus>
    </GameCardWrapper>
  );
};

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

export default GameCard;
