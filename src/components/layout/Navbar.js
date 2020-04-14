import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../lib/colors';

const Navbar = ({ isLoggedIn, logo, showNext, showProfile, showGames, children }) => (
  <NavWrapper>
    <Link to={isLoggedIn ? '/waiting' : '/'}>
      <img src={logo} alt='logo'/>
    </Link>
    <LinkWrapper>
      {children}
    </LinkWrapper>
  </NavWrapper>
);

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
    height: 8vh;
  }
`;

const LinkWrapper = styled.div`
  font-size: 1.5rem;

  button {
    background-color: ${colors.WHITE};
    padding: 0.9rem 1.7rem;
    border: 0;
    border-radius: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
  }

  button:hover {
    color: ${colors.WHITE};
    background-color: ${colors.HIGHLIGHT};
  }

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

Navbar.propTypes = {
  logo: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default Navbar;
