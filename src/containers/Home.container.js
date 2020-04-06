import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Navbar from '../components/layout/Navbar';
import DefaultLayout from '../components/layout/DefaultLayout';
import logo from '../assets/logo.png';

import { logout } from '../actions/auth.actions';

const HomeContainer = ({ userId, logout }) => {
  const token = localStorage.getItem('token');
  const history = useHistory();

  useEffect(() => {
    (token && userId) && history.push('/games');

    // eslint-disable-next-line
  }, [ token, userId ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        <Link to='/auth/signup'>Sign Up</Link>
        {token ? <button onClick={logout}>Logout</button> : <Link to='/auth/login'>Login</Link>}
      </Navbar>
      <DefaultLayout>
        <Title>MUSIC NERD</Title>
        <SubTitle>Find out how nerdy you are in music.</SubTitle>
      </DefaultLayout>
    </Fragment>
  );
};

const Title = styled.h1`
  font-size: 8rem;
`;

const SubTitle = styled.p`
  font-size: 3rem;
  margin-top: 2rem;
`;

const mapStateToProps = state => ({
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  logout: logout(dispatch)
});

HomeContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
