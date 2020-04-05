import React from 'react';
import styled from 'styled-components';

import coverImage from '../../assets/coverImage.jpg';
import * as colors from '../../lib/colors';

const Main = ({ children }) => {
  return (
    <MainWrapper>
      {children}
    </MainWrapper>
  )
};

const MainWrapper = styled.div`
  background-image: url(${coverImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 100vw;
  color: ${colors.MAIN_TEXT_COLOR};
`;

export default Main;
