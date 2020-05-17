import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import DefaultLayout from '../components/layout/DefaultLayout';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';
import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';

import { requestSignup, requestLogin } from '../actions/auth.actions';

const AuthContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector(({ auth }) => auth.loading);
  const error = useSelector(({ auth }) => auth.error);

  return (
    <Fragment>
      <Navbar logo={logo}>
        <Link to='/auth/signup'>Sign Up</Link>
        <Link to='/auth/login'>Login</Link>
      </Navbar>
      <DefaultLayout>
        <Switch>
          <Route exact path='/auth/signup'>
            <Signup
              error={error}
              loading={loading}
              requestSignup={requestSignup(dispatch)}
            />
          </Route>
          <Route exact path='/auth/login'>
            <Login
              error={error}
              loading={loading}
              requestLogin={requestLogin(dispatch)}
            />
          </Route>
        </Switch>
      </DefaultLayout>
    </Fragment>
  );
};

export default AuthContainer;
