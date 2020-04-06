import axios from 'axios';
import {
  REQUEST_MAKE_GAME_START,
  REQUEST_MAKE_GAME_SUCCESS,
  REQUEST_MAKE_GAME_FAILURE
} from '../constants/index';

export const requestMakeGame = dispatch => async (userId, gameTitle) => {
  try {
    dispatch({ type: REQUEST_MAKE_GAME_START, userId, gameTitle });

    const { data } = await axios.post(`http://localhost:8080/games`, {
      userId,
      gameTitle
    });

    const { gameId, thumbnail, isPlaying, createdBy, participants, playResult } = data;

    dispatch({
      type: REQUEST_MAKE_GAME_SUCCESS,
      gameId,
      gameTitle,
      thumbnail,
      isPlaying,
      createdBy,
      participants,
      playResult
    });
  } catch (err) {
    dispatch({ type: REQUEST_MAKE_GAME_FAILURE, error: err.response.data.errorMessage });
  }
};
