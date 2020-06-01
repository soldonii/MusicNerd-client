import styled from 'styled-components';
import * as colors from '../../lib/colors';

export const Auth = {
  Wrapper: styled.section`
    width: 35vw;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
  `,
  ErrorMessage: styled.p`
    margin: 2rem 0;
    font-size: 1.6rem;
    height: 3rem;
    width: 70%;
    text-align: center;
    color: ${colors.ERROR_TEXT_COLOR};
  `,
  SubmitButton: styled.input`
    border: none;
    border-radius: 2rem;
    background-color: ${colors.HIGHLIGHT_COLOR};
    color: ${colors.MAIN_TEXT_COLOR};
    font-size: 2rem;
    padding: 1rem 1.5rem;
    width: 50%;
    cursor: ${props => !props.isActive ? 'normal' : 'pointer'};
    opacity: ${props => !props.isActive ? 0.5 : 1};

    &:hover {
      box-shadow: ${props => !props.isActive ? 'none' : '0.3rem 0.3rem 0.3rem #52b7ff'};
      transition: all 0.3s;
    }
  `
};
