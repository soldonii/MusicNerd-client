import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../layout/Navbar';
import Main from '../layout/Main';
import logo from '../../assets/logo.png';

const Home = () => (
  <Fragment>
    <Navbar logo={logo}>
      <Link to='/signup'>Sign Up</Link>
      <Link to='/login'>Login</Link>
    </Navbar>
    <Main>
      <h1 style={titleStyle}>Music Nerd</h1>
      <p style={descriptionStyle}>Find out how nerdy you are in music.</p>
    </Main>
  </Fragment>
);

const titleStyle = {
  fontSize: '8rem'
};

const descriptionStyle = {
  fontSize: '3rem',
  marginTop: '2rem'
};

export default Home;
