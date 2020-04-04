import React from 'react';
import styled from 'styled-components';

import * as colors from '../../lib/colors';

const Navbar = ({ logo, children}) => {
  return (
    <NavWrapper>
      <img src={logo} alt='logo'/>
      <LinkWrapper>
        {children}
      </LinkWrapper>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  height: 10vh;
  min-width: 100vw;
  background-color: transparent;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;

  & img {
    height: 6vh;
  }
`;

const LinkWrapper = styled.div`
  font-size: 1.5rem;

  & a {
    background-color: ${colors.WHITE};
    padding: 0.9rem 1.7rem;
    border-radius: 2rem;
  }

  & a:hover {
    color: ${colors.WHITE};
    background-color: ${colors.HIGHLIGHT};
  }
`;


export default Navbar;
