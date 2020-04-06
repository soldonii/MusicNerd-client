import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Modal from '../layout/Modal';
import Form from '../layout/Form';
import FormInput from '../layout/FormInput';
import GameCard from './GameCard';
import * as colors from '../../lib/colors';

const WatingRoom = ({ userId, gameId, loading, error, allGames, requestMakeGame, fetchGames }) => {
  const history = useHistory();
  const [ shouldModalOpen, setShouldModalOpen ] = useState(false);
  const [ gameTitle, setGameTitle ] = useState('');

  useEffect(() => {
    if (gameId) {
      history.push(`/games/${gameId}`);
    }
    fetchGames();

    // eslint-disable-next-line
  }, [ gameId ]);

  const onSubmit = e => {
    e.preventDefault();
    requestMakeGame(userId, gameTitle);

    // setShouldModalOpen(false);
  };

  return (
    <Fragment>
      <Modal
        loading={loading}
        error={error}
        shouldModalOpen={shouldModalOpen}
        setShouldModalOpen={setShouldModalOpen}
        title='Create Room'
      >
        <Form style={{ height: '30vh' }} onSubmit={onSubmit}>
          <FormInput type='text' onChange={e => setGameTitle(e.target.value)} />
          <ErrorMessage>{error ? error : null}</ErrorMessage>
          <SubmitButton type='submit' value='Create' />
        </Form>
      </Modal>
      <GameListWrapper>
        <GameListNav>
          <button onClick={() => setShouldModalOpen(true)}>방 만들기</button>
          <button>다음 페이지</button>
        </GameListNav>
        <GameCardWrapper>
          {
            // !allGames.length ?
            //   <h1>There is no room!</h1> :
              allGames.map(game => {
                const { _id: gameId, is_playing: isPlaying, participants, game_title: gameTitle, thumbnail } = game;

                return (
                  <GameCard
                    key={gameId}
                    gameId={gameId}
                    isPlaying={isPlaying}
                    participants={participants}
                    gameTitle={gameTitle}
                    thumbnail={thumbnail}
                  />
                )
              })
          }
        </GameCardWrapper>
      </GameListWrapper>
    </Fragment>
  );
};

const GameListWrapper = styled.div`
  width: 80vw;
  height: 80vh;
  margin: 12vh 0 5vh 0;
  padding: 2rem;
  background-color: black;
  box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem #303030;
  color: white;
  justify-content: center;
`;

const GameListNav = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameCardWrapper = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const ErrorMessage = styled.p`
  margin: 2rem 0;
  font-size: 1.6rem;
  height: 3rem;
  width: 70%;
  text-align: center;
  color: red;
`;

const SubmitButton = styled.input`
  border: none;
  border-radius: 2rem;
  background-color: ${colors.HIGHLIGHT};
  color: ${colors.MAIN_TEXT_COLOR};
  font-size: 2rem;
  padding: 1rem 1.5rem;
  width: 50%;
  cursor: pointer;

  &:hover {
    box-shadow: 0.3rem 0.3rem 0.3rem #52b7ff;
    transition: all 0.3s;
  }
`;

export default WatingRoom;
