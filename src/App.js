import React, { useEffect, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './components/home/Home';
import AuthContainer from './containers/Auth.container';
import UserContainer from './containers/User.container';
import WaitingContainer from './containers/Waiting.container';
import GameContainer from './containers/Game.container';

import ProtectedRoute from './components/routes/ProtectedRoute';
import PageNotFound from './components/PageNotFound';

import GlobalStyle from './components/layout/GlobalStyle';

import setTokenToHeader from './lib/auth';
import history from './lib/history';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token');
    token && setTokenToHeader(token);
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/auth' component={AuthContainer} />
          <ProtectedRoute path='/users' component={UserContainer} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path='/waiting' component={WaitingContainer} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path='/games' component={GameContainer} isAuthenticated={isAuthenticated} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
