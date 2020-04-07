import axios from 'axios';
import {
  CONNECT_SOCKET_REQUEST,
  CONNECT_SOCKET_SUCCESS,
  CONNECT_SOCKET_FAILED
} from '../constants/index';

export const connectSocket = dispatch => async gameId => {
  try {
    dispatch({ type: CONNECT_SOCKET_REQUEST });

    const { data: { game, username } } = await axios.get(`http://localhost:8080/games/${gameId}`);
    dispatch({ type: CONNECT_SOCKET_SUCCESS, game, username });
  } catch (err) {
    dispatch({ type: CONNECT_SOCKET_FAILED, error: err.response.data.errorMessage });
  }
};

