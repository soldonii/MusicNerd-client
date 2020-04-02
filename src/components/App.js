import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import AuthContainer from '../containers/Auth.container';

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Router>
        <AuthContainer />
      </Router>
    </Fragment>
  );
}

const GlobalStyle = createGlobalStyle`
  html {
    background-color: #111626;
    font-size: 10px;
  }
  body {
    min-height: 100vh;
    margin: 0;
    color: #eee;
    font-family: 'Noto Sans KR', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`;

export default App;
