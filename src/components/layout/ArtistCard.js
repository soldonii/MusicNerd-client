import React from 'react';
import styled from 'styled-components';

import * as colors from '../../lib/colors';

const ArtistCard = ({ thumbnailUrl, name }) => {
  return (
    <CardWrapper>
      <img src={thumbnailUrl} alt="thumbnail"/>
      <h1>{name.toUpperCase()}</h1>
    </CardWrapper>
  )
};

const CardWrapper = styled.div`
  width: 17rem;
  height: 20rem;
  padding: 1rem;
  text-align: center;
  margin: 0.5rem auto;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  & img {
    width: 15rem;
    height: 15rem;
  }

  & h1 {
    margin-top: 1rem;
  }
`;

// 선택된 것 색상
// background-color: #FBAB7E;
// background-image: linear-gradient(0deg, #FBAB7E 0%, #F7CE68 100%);

export default ArtistCard;
