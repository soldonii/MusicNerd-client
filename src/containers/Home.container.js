import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { requestLogout } from '../actions/auth.actions';
import Navbar from '../components/layout/Navbar';
import Main from '../components/layout/Main';
import logo from '../assets/logo.png';

const token = localStorage.getItem('token');

const HomeContainer = ({ requestLogout }) => (
  <Fragment>
    <Navbar logo={logo}>
      <Link to='/auth/signup'>Sign Up</Link>
      {token ? <Link to='#' onClick={requestLogout()}>Logout</Link> : <Link to='/auth/login'>Login</Link>}
    </Navbar>
    <Main>
      <h1 style={{ fontSize: '8rem' }}>MUSIC NERD</h1>
      <p style={{ fontSize: '3rem', marginTop: '2rem' }}>Find out how nerdy you are in music.</p>
    </Main>
  </Fragment>
);

const mapDispatchToProps = dispatch => ({
  requestLogout: requestLogout(dispatch)
});

HomeContainer.propTypes = {
  requestLogout: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(HomeContainer);
