import React from 'react';
import styled from 'styled-components';

const PlayerCard = ({ imgSrc, userId, username }) => (
  <CardWrapper data-id={userId}>
    <img src={imgSrc} alt='user-profile'/>
    <h3>{username}</h3>
  </CardWrapper>
);

const CardWrapper = styled.div`
  margin: 0 1.25rem;
  padding: 0.5rem;
  height: 11rem;
  width: 11rem;
  text-align: center;
  background-color: #2f71bd;

  & img {
    margin: 0 auto;
    width: 80%;
    height: auto;
  }

  h3 {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 1.5rem;
  }
`;

export default PlayerCard;
