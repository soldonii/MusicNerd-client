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

const initialState = {
  gameId: '',
  gameList: [],
  loading: false,
  error: null
};

export const waitingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES_REQUEST:
      return {
        ...state,
        loading: true
      };

    case GET_GAMES_SUCCESS:
      return {
        ...state,
        gameList: action.gameList,
        loading: false
      };

    case GET_GAMES_FAILURE:
      return {
        ...state,
        gameList: [],
        loading: false,
        error: action.error
      };

      case CREATE_GAME_REQUEST:
        return {
          ...state,
          loading: true
        };

      case CREATE_GAME_SUCCESS:
        return {
          ...state,
          gameId: action.gameId,
          loading: false,
          error: null
        };

      case CREATE_GAME_FAILED:
        return {
          ...state,
          loading: false,
          gameId: '',
          error: action.error
        };

    case ENTER_GAME_REQUEST:
      return {
        ...state,
        loading: true
      };

    case ENTER_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        gameId: action.gameId
      };

    case ENTER_GAME_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        gameId: ''
      };

    case CLEAR_WAITING_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

