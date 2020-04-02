import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signupSuccess, signupFail, loginSuccess, loginFail } from '../actions/auth.actions';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';

const AuthContainer = ({ authError, onSignupSuccess, onSignupFail, onLoginSuccess, onLoginFail }) => {
  return (
    <Switch>
      <Route exact path='/signup'>
        <Signup
          error={authError}
          onSignupSuccess={onSignupSuccess}
          onSignupFail={onSignupFail}
        />
      </Route>
      <Route exact path='/login'>
        <Login
          error={authError}
          onLoginSuccess={onLoginSuccess}
          onLoginFail={onLoginFail}
        />
      </Route>

    </Switch>
  );
};

AuthContainer.propTypes = {
  authError: PropTypes.string.isRequired,
  onSignupSuccess: PropTypes.func.isRequired,
  onSignupFail: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
  onLoginFail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authError: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  onSignupSuccess: signupSuccess(dispatch),
  onSignupFail: signupFail(dispatch),
  onLoginSuccess: loginSuccess(dispatch),
  onLoginFail: loginFail(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
