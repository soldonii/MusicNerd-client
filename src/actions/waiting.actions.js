import axios from 'axios';
import {
  REQUEST_MAKE_GAME_START,
  REQUEST_MAKE_GAME_SUCCESS,
  REQUEST_MAKE_GAME_FAILURE,
  FETCH_GAMES_START,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_FAILURE,
} from '../constants/index';

export const requestMakeGame = dispatch => async (userId, gameTitle) => {
  try {
    dispatch({ type: REQUEST_MAKE_GAME_START, userId, gameTitle });

    const { data: { createdGameId } } = await axios.post(`http://localhost:8080/waiting`, {
      userId,
      gameTitle
    });

    dispatch({ type: REQUEST_MAKE_GAME_SUCCESS, createdGameId });
  } catch (err) {
    dispatch({ type: REQUEST_MAKE_GAME_FAILURE, error: err.response.data.errorMessage });
  }
};

export const fetchGames = dispatch => async () => {
  try {
    dispatch({ type: FETCH_GAMES_START });

    const { data: { allGames } } = await axios.get('http://localhost:8080/waiting');
    dispatch({ type: FETCH_GAMES_SUCCESS, allGames });
  } catch (err) {
    dispatch({ type: FETCH_GAMES_FAILURE, error: err.response.data.errorMessage });
  }
};

