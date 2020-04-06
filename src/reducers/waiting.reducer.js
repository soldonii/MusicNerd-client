import {
  REQUEST_MAKE_GAME_START,
  REQUEST_MAKE_GAME_SUCCESS,
  REQUEST_MAKE_GAME_FAILURE,
  FETCH_GAMES_START,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_FAILURE,
} from '../constants/index';

const initialState = {
  createdGameId: '',
  allGames: [],
  loading: false,
  error: null
};

export const waitingReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_MAKE_GAME_START:
      return {
        ...state,
        loading: true
      };

    case REQUEST_MAKE_GAME_SUCCESS:
      return {
        ...state,
        createdGameId: action.createdGameId,
        loading: false,
        error: null
      };

    case REQUEST_MAKE_GAME_FAILURE:
      return {
        ...state,
        loading: false,
        createdGameId: '',
        error: action.error
      };

    case FETCH_GAMES_START:
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

    default:
      return state;
  }
};

