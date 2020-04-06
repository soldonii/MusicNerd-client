import React from 'react';
import styled from 'styled-components';

const GameCard = () => {
  return (
    <GameCardWrapper>
      <h1>hello</h1>
    </GameCardWrapper>
  );
};

const GameCardWrapper = styled.div`
  padding: 1rem;
  border: 0.3rem solid black;
  height: 100%;
  width: 24rem;
  background-color: blue;
`;

export default GameCard;
