import React from 'react';
import styled from 'styled-components';

import Button from '../layout/Button';
import histroy from '../../lib/history';

const FinalScore = ({ score }) => {
  const sortedScore = [];
  for (const player in score) {
    sortedScore.push([player, score[player]]);
  }

  sortedScore.sort((a, b) => b[1] - a[1]);

  const onConfirmButtonClick = () => histroy.push('/waiting');

  return (
    <ScoreWrapper>
      {sortedScore.map(score => (
        <Score>
          <h1>{score[0]}</h1>
          <h2>{score[1]}</h2>
        </Score>
      ))}
      <Button onClick={onConfirmButtonClick}>Confirm</Button>
    </ScoreWrapper>
  );
};

const ScoreWrapper = styled.div`
  height: 50vh;
  width: 40vw;
  padding: 2rem;
`;

const Score = styled.div`
  height: 3rem;
  width: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: 0.2rem 0.2rem 0.2rem #0017bd;

  h1 {
    color: #0017bd;
    font-weight: bold;
    width: 56%;
    margin-right: 2%;
    text-align: right;
  }

  h2 {
    width: 40%;
    margin-left: 2%;
    text-align: left;
  }
`;

export default FinalScore;
