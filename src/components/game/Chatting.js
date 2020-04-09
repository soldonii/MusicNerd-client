import React, { Fragment } from 'react';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';

const ScrollBarCss = css({
  height: '93%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
});

const Chatting = ({ message, setMessage, onSendButtonClick, children }) => {
  return (
    <Wrapper>
      <ScrollToBottom className={ScrollBarCss}>
        {children.map(msg => (
          <div key={Math.random()}>
            <User>{msg.username}</User>
            <Message>{msg.message}</Message>
          </div>
        ))
        }
      </ScrollToBottom>
      <InputForm>
        <input
          type='text'
          placeholder='Type messages..'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button onClick={e => onSendButtonClick(e, message)}>Send</button>
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

const User = styled.span`
  width: 20%;
  height: 2rem;
  font-size: 1.5rem;
  text-align: left;
  font-weight: bold;
`;

const Message = styled.span`
  width: 80%;
  height: 2rem;
  font-size: 1.5rem;
  text-align: left;
`;

export default Chatting;
