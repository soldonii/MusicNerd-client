import { createGlobalStyle } from 'styled-components';
import * as colors from '../../lib/colors';

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

export default GlobalStyle;
