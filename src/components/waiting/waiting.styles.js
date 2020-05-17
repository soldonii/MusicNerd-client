import styled from 'styled-components';
import * as colors from '../../lib/colors';

export const WaitingRoom = {
  GameListWrapper: styled.div`
    width: 80vw;
    height: 80vh;
    margin: 12vh 0 5vh 0;
    padding: 2rem;
    background-color: ${colors.DEFAULT_GLOBAL_FONT_COLOR};
    box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem #303030;
    color: ${colors.MAIN_TEXT_COLOR};
    justify-content: center;
  `,
  GameListNav: styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
  GameCardWrapper: styled.div`
    width: 100%;
    height: 90%;
    overflow-x: scroll;
    display: flex;
    justify-content: ${props => props.loading ? 'center' : 'flex-start'};
    align-items: center;
    ::-webkit-scrollbar {
      display: none;
    }
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
    cursor: pointer;

    &:hover {
      box-shadow: 0.3rem 0.3rem 0.3rem #52b7ff;
      transition: all 0.3s;
    }
  `
};

export const GameCard = {
  GameCardWrapper: styled.div`
    padding: 1rem;
    border: 0.3rem solid ${colors.DEFAULT_GLOBAL_FONT_COLOR};
    height: 100%;
    width: 24rem;
    background: url(${props => props.thumbnailUrl});
    background-size: cover;
    text-align: center;
    color: ${colors.MAIN_TEXT_COLOR};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
    cursor: pointer;

    h1 {
      margin-top: 2rem;
      font-size: 2.5rem;
      font-weight: bold;
    }
  `,
  GameStatus: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10rem;
  `
};
