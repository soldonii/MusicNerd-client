import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
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
  requestGameStart,
} from '../../lib/socket';

const GameRoom = ({
  userId,
  gameId,
  gameCreator,
  participants,
  readyStatus,
  chatMessages,
  score, // { soldonii: 10 }
  // loading,
  // error,
  trackUrl,
  resetGameState,
}) => {
  const [ isReady, setIsReady ] = useState(false);
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    // start game을 누르면 서버에 요청을 보내서 음원 10개를 추린 후에, 그 중 마지막 음원을 보낸다.
    // 보내진 음원은 trackUrl state로 update되고, 해당 state가 update되면 아래 음원 재생 로직이 실행됨.

    // 음원 실행 중 user chatMessage를 서버 쪽에서 확인해야된다.

    const sound = new Howl({
      src: [trackUrl],
      volume: 0.7,
      onplay: () => {
        setTimeout(() => {
          sound.fade(0.7, 0, 1000 * 5);
        }, 1000 * 25);

        setTimeout(() => {
          sound.stop();
        }, 1000 * 30);
      },
      onstop: () => {
        console.log('music stopped');
      }
    });

    sound.play();
  }, [ trackUrl ]);

  const onExitButtonClick = (userId, gameId) => {
    leaveRoom(userId, gameId);
    resetGameState();
    return history.push('/waiting');
  };

  const onReadyButtonClick = userId => {
    !isReady ? onReady(userId) : offReady(userId);
    setIsReady(!isReady);
  };

  const onStartButtonClick = () => {
    for (const participant of participants) {
      if (!readyStatus[participant.userId]) {
        window.alert('모든 유저가 READY하지 않았습니다!');
      }
    }

    requestGameStart(participants);
  };

  const onSendButtonClick = (event, message) => {
    event.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <DefaultLayout>
      <GameWrapper>
        <Header>
          {participants.map(player => (
            <PlayerCard
              key={player.userId}
              imgSrc={player.thumbnail_url}
              userId={player.userId}
              username={player.username}
              score={score[player.username] ? score[player.username] : 0}
              isReady={readyStatus[player.userId] ? true : false}
            />
          ))}
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
