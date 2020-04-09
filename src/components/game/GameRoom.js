import React, { useState } from 'react';
import styled from 'styled-components';

import DefaultLayout from '../layout/DefaultLayout';
import Header from '../layout/Header';
import PlayerCard from './PlayerCard';
import Chatting from './Chatting';

import history from '../../lib/history';
import wave from '../../assets/soundwave.gif';

import {
  leaveRoom,
  onReady,
  offReady,
  sendMessage,
  startGame,
} from '../../lib/socket';

const GameRoom = ({
  userId,
  gameId,
  gameCreator,
  participants,
  readyStatus,
  chatMessages,
  // loading,
  // error,
}) => {
  const [ isReady, setIsReady ] = useState(false);
  const [ message, setMessage ] = useState('');

  const onExitButtonClick = (userId, gameId) => {
    leaveRoom(userId, gameId);
    return history.push('/waiting');
  };

  const onReadyButtonClick = userId => {
    !isReady ? onReady(userId) : offReady(userId);
    setIsReady(!isReady);
  };

  const onStartButtonClick = () => {
    for (const participant of participants) {
      if (!readyStatus[participant]) {
        window.alert('모든 유저가 READY하지 않았습니다!');
      }
    }

    startGame();
  };

  const onSendButtonClick = (event, message) => {
    event.preventDefault();
    sendMessage(message);
  };

  return (
    <DefaultLayout>
      <GameWrapper>
        <Header>
          {
            participants.map(player => (
              <PlayerCard
                key={player.userId}
                imgSrc={player.thumbnail_url}
                userId={player.userId}
                username={player.username}
                isReady={readyStatus[player.userId] ? true : false}
              />
            ))
          }
        </Header>
        <GameMain>
          <MainLeft>
            <img src={wave} alt="wave"/>
          </MainLeft>
          <MainRight>
            <ButtonContainer>
              <button onClick={() => onReadyButtonClick(userId)}>READY</button>
              {gameCreator === userId &&
                <button onClick={onStartButtonClick}>GAME START</button>}
              <button onClick={() => onExitButtonClick(userId, gameId)}>EXIT</button>
            </ButtonContainer>
            <Chatting
              message={message}
              setMessage={setMessage}
              onSendButtonClick={onSendButtonClick}
            >
              {chatMessages}
            </Chatting>
          </MainRight>
        </GameMain>
      </GameWrapper>
    </DefaultLayout>
  );
};

const GameWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2vh 2vw;
`;

const GameMain = styled.div`
  height: 76vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainLeft = styled.div`
  height: 45rem;
  width: 55rem;
  margin: 0 1.5rem;
  background-color: lightgray;

  & img {
    height: 45rem;
    width: 55rem;
  }
`;

const MainRight = styled.div`
  height: 45rem;
  width: 55rem;
  margin: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 55rem;
  display: flex;
  justify-content: space-between;
`;

export default GameRoom;
