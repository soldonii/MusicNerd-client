import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';
import DefaultLayout from '../components/layout/DefaultLayout';
import Navbar from '../components/layout/Navbar';

import { requestSignup, requestLogin, clearError, requestLogout } from '../actions/auth.actions';
import logo from '../assets/logo.png';

const AuthContainer = ({
  userId,
  hasSignedUp,
  isAuthenticated,
  error,
  loading,
  requestSignup,
  requestLogin,
  requestLogout,
  clearError
}) => {
  const token = localStorage.getItem('token');

  return (
    <Fragment>
      <Navbar logo={logo}>
        <Link to='/auth/signup'>Sign Up</Link>
        {token ? <button onClick={requestLogout}>Logout</button> : <Link to='/auth/login'>Login</Link>}
      </Navbar>
      <Switch>
        <Route exact path='/auth/signup'>
          <DefaultLayout>
            <Signup
              hasSignedUp={hasSignedUp}
              signupError={error}
              loading={loading}
              requestSignup={requestSignup}
              clearError={clearError}
            />
          </DefaultLayout>
        </Route>
        <Route exact path='/auth/login'>
          <DefaultLayout>
            <Login
              userId={userId}
              isAuthenticated={isAuthenticated}
              error={error}
              loading={loading}
              requestLogin={requestLogin}
              clearError={clearError}
            />
          </DefaultLayout>
        </Route>
      </Switch>
    </Fragment>
  );
};

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
  requestLogout: requestLogout(dispatch),
  clearError: clearError(dispatch)
});

AuthContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  hasSignedUp: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  requestSignup: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
  requestLogout: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
