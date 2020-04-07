import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import HomeContainer from '../containers/Home.container';
import AuthContainer from '../containers/Auth.container';
import UserContainer from '../containers/User.container';
import WaitingContainer from '../containers/Waiting.container';
import GameContainer from '../containers/Game.container';

import * as colors from '../lib/colors';

const App = () => (
  <Fragment>
    <GlobalStyle />
    <Router>
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

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans KR';
    src: url('../assets/fonts/Ubuntu-Medium.ttf');
  }

  html {
    font-size: 10px;
  }

  body {
    min-height: 100vh;
    margin: 0;
    color: black;
    background-color: black;
  }

  * {
    box-sizing: border-box;
    font-family: 'Ubuntu', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  a, a:link, a:visited {
    text-decoration: none;
    color: black;
    margin: 0 1rem;
  }

  a:hover {
    color: ${colors.HIGHLIGHT};
    transition: all 0.3s;
  }
`;

export default App;
