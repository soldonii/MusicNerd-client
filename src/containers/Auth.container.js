import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signupSuccess, signupFail, loginSuccess, loginFail, clearError } from '../actions/auth.actions';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';
import Main from '../components/layout/Main';
import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';

const AuthContainer = ({
  authError,
  onSignupSuccess,
  onSignupFail,
  onLoginSuccess,
  onLoginFail,
  clearError
}) => {
  return (
    <Fragment>
      <Navbar logo={logo}>
        <Link to='/auth/signup'>Sign Up</Link>
        <Link to='/auth/login'>Login</Link>
      </Navbar>
      <Switch>
        <Route exact path='/auth/signup'>
          <Main>
            <Signup
              error={authError}
              onSignupSuccess={onSignupSuccess}
              onSignupFail={onSignupFail}
              clearError={clearError}
            />
          </Main>
        </Route>
        <Route exact path='/auth/login'>
          <Main>
            <Login
              error={authError}
              onLoginSuccess={onLoginSuccess}
              onLoginFail={onLoginFail}
              clearError={clearError}
            />
          </Main>
        </Route>
      </Switch>
    </Fragment>
  );
};

AuthContainer.propTypes = {
  authError: PropTypes.string,
  onSignupSuccess: PropTypes.func.isRequired,
  onSignupFail: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
  onLoginFail: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authError: state.auth.error,
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  onSignupSuccess: signupSuccess(dispatch),
  onSignupFail: signupFail(dispatch),
  onLoginSuccess: loginSuccess(dispatch),
  onLoginFail: loginFail(dispatch),
  clearError: clearError(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
