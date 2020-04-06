import axios from 'axios';
import {
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILED,
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_FAILURE,
  ENTER_GAME_REQUEST,
  ENTER_GAME_SUCCESS,
  ENTER_GAME_FAILED
} from '../constants/index';

export const postGame = dispatch => async (userId, gameTitle) => {
  try {
    dispatch({ type: CREATE_GAME_REQUEST, userId, gameTitle });

    const { data: { createdGameId } } = await axios.post(`http://localhost:8080/waiting`, {
      userId,
      gameTitle
    });

    dispatch({ type: CREATE_GAME_SUCCESS, createdGameId });
  } catch (err) {
    dispatch({ type: CREATE_GAME_FAILED, error: err.response.data.errorMessage });
  }
};

export const fetchGames = dispatch => async () => {
  try {
    dispatch({ type: FETCH_GAMES_REQUEST });

    const { data: { allGames } } = await axios.get('http://localhost:8080/waiting');
    dispatch({ type: FETCH_GAMES_SUCCESS, allGames });
  } catch (err) {
    dispatch({ type: FETCH_GAMES_FAILURE, error: err.response.data.errorMessage });
  }
};

export const enterGame = dispatch => async gameId => {
  try {
    dispatch({ type: ENTER_GAME_REQUEST });
    await axios.put('http://localhost:8080/games', { gameId });

    dispatch({ type: ENTER_GAME_SUCCESS, gameId });
  } catch (err) {
    dispatch({ type: ENTER_GAME_FAILED, error: err.response.data.errorMessage });
  }
};
