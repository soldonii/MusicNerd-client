import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from '../layout/Modal';
import Form from '../layout/Form';
import FormInput from '../layout/FormInput';
import Loading from '../layout/Loading';
import Button from '../layout/Button';
import GameCard from './GameCard';

import * as SC from './waiting.styles';

const WatingRoom = ({
  userId,
  gameList,
  loading,
  createGameLoading,
  getGameListError,
  createGameError,
  createGame,
  enterGame,
}) => {
  const dispatch = useDispatch();
  const [ shouldModalOpen, setShouldModalOpen ] = useState(false);
  const [ gameTitle, setGameTitle ] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createGame(userId, gameTitle));
  };

  const closeModal = () => {
    setGameTitle('');
    setShouldModalOpen(false);
  };

  if (getGameListError) {
    return <h1>{getGameListError}</h1>;
  }

  return (
    <Fragment>
      <Modal
        loading={loading}
        shouldModalOpen={shouldModalOpen}
        closeModal={closeModal}
        title='Create Room'
      >
        <Form style={{ height: '30vh' }} onSubmit={onSubmit}>
          {createGameLoading ?
            <Loading color='black' /> :
            <Fragment>
              <FormInput type='text' onChange={e => setGameTitle(e.target.value)} value={gameTitle} />
              <SC.WaitingRoom.ErrorMessage>
                {createGameError ? createGameError : null}
              </SC.WaitingRoom.ErrorMessage>
              <SC.WaitingRoom.SubmitButton type='submit' value='Create' />
            </Fragment>}
        </Form>
      </Modal>
      <SC.WaitingRoom.GameListWrapper>
        <SC.WaitingRoom.GameListNav>
          <Button onClick={() => setShouldModalOpen(true)}>방 만들기</Button>
        </SC.WaitingRoom.GameListNav>
        <SC.WaitingRoom.GameCardWrapper loading={loading ? 1 : 0}>
          {loading && <Loading />}
          {!loading && !gameList.length ?
            <h1 style={{ margin: '0 auto', fontSize: '4rem' }}>Please create a game room.</h1> :
              gameList.map(game => {
                const {
                  _id: gameId,
                  is_playing: isPlaying,
                  players,
                  game_title: gameTitle,
                  thumbnail_url: thumbnailUrl
                } = game;

                return (
                  <GameCard
                    key={gameId}
                    gameId={gameId}
                    isPlaying={isPlaying}
                    players={players}
                    gameTitle={gameTitle}
                    thumbnailUrl={thumbnailUrl}
                    enterGame={enterGame}
                  />
                );
            })}
        </SC.WaitingRoom.GameCardWrapper>
      </SC.WaitingRoom.GameListWrapper>
    </Fragment>
  );
};

WatingRoom.propTypes = {
  userId: PropTypes.string.isRequired,
  gameList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  createGameLoading: PropTypes.bool.isRequired,
  getGameListError: PropTypes.string,
  createGameError: PropTypes.string,
  createGame: PropTypes.func.isRequired,
  enterGame: PropTypes.func.isRequired,
};

export default WatingRoom;
