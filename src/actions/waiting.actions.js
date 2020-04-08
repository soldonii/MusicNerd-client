import axios from 'axios';
import {
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILED,
  GET_GAMES_REQUEST,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  ENTER_GAME_REQUEST,
  ENTER_GAME_SUCCESS,
  ENTER_GAME_FAILED,
  CLEAR_WAITING_ERROR
} from '../constants/index';

export const getGames = dispatch => async () => {
  try {
    dispatch({ type: GET_GAMES_REQUEST });

    const { data: { gameList } } = await axios.get('http://localhost:8080/waiting');
    dispatch({ type: GET_GAMES_SUCCESS, gameList });
  } catch (err) {
    dispatch({ type: GET_GAMES_FAILURE, error: err.response.data.errorMessage });
  }
};

export const createGame = dispatch => async (userId, gameTitle) => {
  try {
    dispatch({ type: CREATE_GAME_REQUEST, userId, gameTitle });

    const { data: { gameId } } = await axios.post(`http://localhost:8080/waiting`, {
      userId,
      gameTitle
    });

    dispatch({ type: CREATE_GAME_SUCCESS, gameId });
  } catch (err) {
    dispatch({ type: CREATE_GAME_FAILED, error: err.response.data.errorMessage });
  }
};

export const enterGame = dispatch => async gameId => {
  try {
    dispatch({ type: ENTER_GAME_REQUEST });
    await axios.put('http://localhost:8080/waiting', { gameId });

    dispatch({ type: ENTER_GAME_SUCCESS, gameId });
  } catch (err) {
    dispatch({ type: ENTER_GAME_FAILED, error: err.response.data.errorMessage });
  }
};

export const clearError = dispatch => () => {
  dispatch({ type: CLEAR_WAITING_ERROR });
};
