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

const initialState = {
  createdGameId: '',
  allGames: [],
  enterGameId: '',
  loading: false,
  error: null
};

export const waitingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME_REQUEST:
      return {
        ...state,
        loading: true
      };

    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        createdGameId: action.createdGameId,
        loading: false,
        error: null
      };

    case CREATE_GAME_FAILED:
      return {
        ...state,
        loading: false,
        createdGameId: '',
        error: action.error
      };

    case FETCH_GAMES_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        allGames: action.allGames,
        loading: false
      };

    case FETCH_GAMES_FAILURE:
      return {
        ...state,
        allGames: [],
        loading: false,
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
        enterGameId: action.gameId
      };

    case ENTER_GAME_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

