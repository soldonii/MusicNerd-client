import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import DefaultLayout from '../layout/DefaultLayout';
import Navbar from '../layout/Navbar';
import logo from '../../assets/logo.png';

import * as SC from './home.styles';

const Home = () => (
  <Fragment>
    <Navbar logo={logo}>
      <Link to='/auth/signup'>Sign Up</Link>
      <Link to='/auth/login'>Login</Link>
    </Navbar>
    <DefaultLayout>
      <SC.Home.Title>MUSIC NERD</SC.Home.Title>
      <SC.Home.SubTitle>Find out how nerdy you are in music.</SC.Home.SubTitle>
    </DefaultLayout>
  </Fragment>
);

export default Home;
