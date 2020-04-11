import React, { useState, useEffect, Fragment } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';

import ProtectedRoute from './routes/ProtectedRoute';
import HomeContainer from '../containers/Home.container';
import AuthContainer from '../containers/Auth.container';
import UserContainer from '../containers/User.container';
import WaitingContainer from '../containers/Waiting.container';
import GameContainer from '../containers/Game.container';

import Navbar from './layout/Navbar';
import logo from '../assets/logo.png';

import GlobalStyle from './layout/GlobalStyle';

import { setTokenToHeader } from '../lib/auth';
import history from '../lib/history';

const App = () => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    // console.log('token', token);

    // !token && history.push('/');
    // token && setIsLoggedIn(true);

    setTokenToHeader(token);
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Router history={history}>
        {/* <Navbar
          isLoggedIn={isLoggedIn}
          logo={logo}
          // shouldHide={}
          showNext={pathname.includes('favorites')}
          showProfile={pathname.includes('waiting')}
          showGames={pathname.includes('profile')}
        /> */}
        {/* <Navbar logo={logo}>
          <Link to='/auth/signup'>Sign Up</Link>
          {localStorage.getItem('token') ? <button>Logout</button> : <Link to='/auth/login'>Login</Link>}
        </Navbar>
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/auth' component={AuthContainer} />
          <ProtectedRoute path='/users' component={UserContainer} isLoggedIn={localStorage.getItem('token')}  />
          <ProtectedRoute path='/waiting' component={WaitingContainer} isLoggedIn={localStorage.getItem('token')}  />
          <ProtectedRoute path='/games' component={GameContainer} isLoggedIn={localStorage.getItem('token')}  />
        </Switch> */}



        {/* <Navbar logo={logo}>
          <Link to='/auth/signup'>Sign Up</Link>
          {token ? <button>Logout</button> : <Link to='/auth/login'>Login</Link>}
        </Navbar> */}
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/auth' component={AuthContainer} />
          <Route path='/users' component={UserContainer} />
          <Route path='/waiting' component={WaitingContainer} />
          <Route path='/games' component={GameContainer} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
