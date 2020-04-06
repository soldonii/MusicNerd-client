import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { requestSignup, requestLogin, clearError, requestLogout } from '../actions/auth.actions';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';
import Main from '../components/layout/Main';
import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';

const token = localStorage.getItem('token');

const AuthContainer = ({
  userId,
  hasSignedUp,
  isAuthenticated,
  error,
  loading,
  requestSignup,
  requestLogin,
  clearError,
  requestLogout
}) => (
  <Fragment>
    <Navbar logo={logo}>
      <Link to='/auth/signup'>Sign Up</Link>
      {token ? <Link to='#' onClick={requestLogout()}>Logout</Link> : <Link to='/auth/login'>Login</Link>}
    </Navbar>
    <Switch>
      <Route exact path='/auth/signup'>
        <Main>
          <Signup
            hasSignedUp={hasSignedUp}
            error={error}
            loading={loading}
            requestSignup={requestSignup}
            clearError={clearError}
          />
        </Main>
      </Route>
      <Route exact path='/auth/login'>
        <Main>
          <Login
            userId={userId}
            isAuthenticated={isAuthenticated}
            error={error}
            loading={loading}
            requestLogin={requestLogin}
            clearError={clearError}
          />
        </Main>
      </Route>
    </Switch>
  </Fragment>
);

const mapStateToProps = state => ({
  userId: state.auth.userId,
  hasSignedUp: state.auth.hasSignedUp,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  requestSignup: requestSignup(dispatch),
  requestLogin: requestLogin(dispatch),
  clearError: clearError(dispatch),
  requestLogout: requestLogout(dispatch)
});

AuthContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  hasSignedUp: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  requestSignup: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  requestLogout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
