import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ lengthLimit, selectedLength }) => (
  <Bar>
    <Progress style={{ width: `${selectedLength / lengthLimit * 100}%` }} />
  </Bar>
);

const Bar = styled.div`
  border: 1px solid white;
  border-radius: 2rem;
  width: 45rem;
  height: 1rem;
  margin: 1rem auto 3rem auto;
`;

const Progress = styled.div`
  height: 100%;
  border-radius: 2rem;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;


export default ProgressBar;
