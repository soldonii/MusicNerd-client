import React, { useState, Fragment } from 'react';
import styled from 'styled-components';

import Modal from '../layout/Modal';
import Form from '../layout/Form';
import FormInput from '../layout/FormInput';
import GameCard from './GameCard';
import * as colors from '../../lib/colors';

const WatingRoom = ({ userId, requestMakeGame }) => {
  const [ shouldModalOpen, setShouldModalOpen ] = useState(false);
  const [ gameTitle, setGameTitle ] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    setShouldModalOpen(false);
    requestMakeGame(userId, gameTitle);
  };

  return (
    <Fragment>
      <Modal
        shouldModalOpen={shouldModalOpen}
        setShouldModalOpen={setShouldModalOpen}
        title='Create Room'
      >
        <Form style={{ height: '30vh' }} onSubmit={onSubmit}>
          <FormInput type='text' onChange={e => setGameTitle(e.target.value)} />
          <SubmitButton type='submit' value='Login' />
        </Form>
      </Modal>
      <GameListWrapper>
        <GameListNav>
          <button onClick={() => setShouldModalOpen(true)}>방 만들기</button>
          <button>다음 페이지</button>
        </GameListNav>
        <GameCardWrapper>
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
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
  justify-content: center;
  align-items: center;
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
