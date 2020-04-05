import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as colors from '../../lib/colors';

const Navbar = ({ logo, children}) => {
  // console.log(localStorage.getItem('token'))
  // localStorage에 token 없으면 완전 '/'로 이동, 있으면 '/game'으로 이동

  return (
    <NavWrapper>
      <Link to='/'><img src={logo} alt='logo'/></Link>
      <LinkWrapper>
        {children}
      </LinkWrapper>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  height: 10vh;
  width: 100%;
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
