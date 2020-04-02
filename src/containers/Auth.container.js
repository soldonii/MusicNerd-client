import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signupSuccess, signupFail } from '../actions/auth.actions';
import Signup from '../components/auth/Signup';

const AuthContainer = ({ authError, onSuccess, onFail }) => {
  return (
    <Switch>
      <Route exact path='/signup'>
        <Signup
          error={authError}
          onSuccess={onSuccess}
          onFail={onFail}
        />
      </Route>

    </Switch>
  );
};

AuthContainer.propTypes = {
  authError: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authError: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  onSuccess: signupSuccess(dispatch),
  onFail: signupFail(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
