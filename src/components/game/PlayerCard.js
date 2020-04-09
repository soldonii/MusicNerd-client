import React from 'react';
import styled from 'styled-components';

const PlayerCard = ({ imgSrc, userId, username, score, isReady }) => (
  <CardWrapper data-id={userId} isReady={isReady}>
    <img src={imgSrc} alt='user-profile'/>
    <h3>{username}</h3>
    <h6>{score}</h6>
  </CardWrapper>
);

const CardWrapper = styled.div`
  margin: 0 1.25rem;
  padding: 0.5rem;
  height: 11rem;
  width: 11rem;
  text-align: center;
  background-color: ${props => props.isReady ? '#FBAB7E' : '#2f71bd'};
  background-image: ${props => props.isReady && 'linear-gradient(0deg, #FBAB7E 0%, #F7CE68 100%)'};

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

  h6 {
    font-size: 1rem;
    color: red;
  }
`;

export default PlayerCard;
