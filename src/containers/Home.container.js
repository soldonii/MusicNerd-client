import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Navbar from '../components/layout/Navbar';
import DefaultLayout from '../components/layout/DefaultLayout';

import { requestLogout } from '../actions/auth.actions';
import logo from '../assets/logo.png';

const HomeContainer = ({ requestLogout }) => {
  const token = localStorage.getItem('token');
  const history = useHistory();

  useEffect(() => {
    token && history.push('/games');

    // eslint-disable-next-line
  }, [ token ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        <Link to='/auth/signup'>Sign Up</Link>
        {token ? <button onClick={requestLogout}>Logout</button> : <Link to='/auth/login'>Login</Link>}
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

const mapDispatchToProps = dispatch => ({
  requestLogout: requestLogout(dispatch)
});

HomeContainer.propTypes = {
  requestLogout: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(HomeContainer);
