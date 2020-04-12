import React, { useEffect, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import HomeContainer from '../containers/Home.container';
import AuthContainer from '../containers/Auth.container';
import UserContainer from '../containers/User.container';
import WaitingContainer from '../containers/Waiting.container';
import GameContainer from '../containers/Game.container';

import ProtectedRoute from './routes/ProtectedRoute';
import PageNotFound from './PageNotFound';

import GlobalStyle from './layout/GlobalStyle';

import { setTokenToHeader } from '../lib/auth';
import history from '../lib/history';

const App = ({ isAuthenticated }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    token && setTokenToHeader(token)
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/auth' component={AuthContainer} />
          <ProtectedRoute path='/users' component={UserContainer} isLoggedIn={isAuthenticated} />
          <ProtectedRoute path='/waiting' component={WaitingContainer} isLoggedIn={isAuthenticated} />
          <ProtectedRoute path='/games' component={GameContainer} isLoggedIn={isAuthenticated} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(App);
