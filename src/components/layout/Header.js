import React from 'react';
import styled from 'styled-components';

const Header = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

const Wrapper = styled.div`
  height: 20vh;
  width: 100%;
  padding: 1vh 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.4rem 0.2rem -0.2rem #0056AF;
`;

export default Header;