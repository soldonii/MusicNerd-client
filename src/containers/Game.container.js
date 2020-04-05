import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// import { Switch, Route, Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';

const GameContainer = () => {
  return (
      <Fragment>
        <Navbar logo={logo}>
          <Link to='/users/:userId/profile'>Profile</Link>
          <Link to='/'>Logout</Link>
        </Navbar>
      </Fragment>
  )
};

export default GameContainer;
