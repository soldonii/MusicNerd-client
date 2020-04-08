import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import DefaultLayout from '../layout/DefaultLayout';
import Header from '../layout/Header';
import PlayerCard from './PlayerCard';
import Chatting from './Chatting';

import { disconnectSocket } from '../../lib/socket';
import wave from '../../assets/soundwave.gif';

const GameRoom = ({
  hasJoined,
  userId,
  gameId,
  participants,
  joinRoom,
  leaveRoom,
  updateParticipants
}) => {
  const history = useHistory();

  useEffect(() => {
    joinRoom(userId, gameId);
    return () => disconnectSocket();

    // eslint-disable-next-line
  }, [ userId, gameId ]);

  useEffect(() => {
    updateParticipants();

    return () => disconnectSocket();

    // eslint-disable-next-line
  }, []);

  const onExitButtonClick = (userId, gameId) => {
    leaveRoom(userId, gameId);
    return history.push('/waiting');
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
              />
            ))
          }
        </Header>
        <GameMain>
          <MainLeft>
            <img src={wave} alt="wave"/> {/* 추후 soundwave 시각화 library로 대체  */}
          </MainLeft>
          <MainRight>
            <ButtonContainer>
              <button >READY</button>
              <button onClick={() => onExitButtonClick(userId, gameId)}>EXIT</button>
            </ButtonContainer>
            <Chatting>
              some message...
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
