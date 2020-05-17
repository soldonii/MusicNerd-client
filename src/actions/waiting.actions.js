import axios from 'axios';
import history from '../lib/history';
import setTokenToHeader from '../lib/auth';
import {
  GET_GAMES_REQUEST,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILED,
  JOIN_GAME_REQUEST,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAILED,
  CLEAR_CREATE_GAME_ERROR
} from '../constants/index';

export const getGames = () => {
  return async dispatch => {
    setTokenToHeader();

    try {
      dispatch({ type: GET_GAMES_REQUEST });

      const { data: { gameList } } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/waiting`);
      dispatch({ type: GET_GAMES_SUCCESS, gameList });
    } catch (err) {
      dispatch({ type: GET_GAMES_FAILURE, error: err.response.data.errorMessage });
    }
  };
};

export const createGame = (userId, gameTitle) => {
  return async dispatch => {
    setTokenToHeader();

    try {
      dispatch({ type: CREATE_GAME_REQUEST, userId, gameTitle });

      const { data: { gameId } }
        = await axios.post(`${process.env.REACT_APP_SERVER_URI}/waiting`, { userId, gameTitle });
      dispatch({ type: CREATE_GAME_SUCCESS, gameId });

      return history.push(`/games/${gameId}`);
    } catch (err) {
      dispatch({ type: CREATE_GAME_FAILED, error: err.response.data.errorMessage });

      const errorTimeoutId = window.setTimeout(() => {
        dispatch({ type: CLEAR_CREATE_GAME_ERROR });

        return window.clearTimeout(errorTimeoutId);
      }, 3000);
    }
  };
};

export const enterGame = gameId => {
  return async dispatch => {
    setTokenToHeader();

    try {
      dispatch({ type: JOIN_GAME_REQUEST });

      await axios.put(`${process.env.REACT_APP_SERVER_URI}/waiting`, { gameId });
      dispatch({ type: JOIN_GAME_SUCCESS, gameId });

      return history.push(`/games/${gameId}`);
    } catch (err) {
      dispatch({ type: JOIN_GAME_FAILED, error: err.response.data.errorMessage });

      window.alert(err.response.data.errorMessage);
    }
  };
};
