import React from 'react';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';

const ScrollBarCss = css({
  height: '93%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
});

const Chatting = ({ messages }) => {
  return (
    <Wrapper>
      <ScrollToBottom className={ScrollBarCss}>
        <p>Messages.......</p>
      </ScrollToBottom>
      <InputForm>
        <input
          type='text'
          placeholder='Type messages..'
        />
        <button>Send</button>
      </InputForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 40rem;
  width: 55rem;
  margin: 0 1.5rem;
`;

const InputForm = styled.form`
  display: flex;
  justify-content: space-between;

  & input {
    width: 85%;
    padding: 0 1rem;
    font-size: 1.5rem;
  }

  & button {
    width: 15%;
    background-color: #001527;
    color: white;
    font-size: 2rem;
  }
`;

export default Chatting;
