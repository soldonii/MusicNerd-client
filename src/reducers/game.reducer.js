import {
  REQUEST_MAKE_GAME_START,
  REQUEST_MAKE_GAME_SUCCESS,
  REQUEST_MAKE_GAME_FAILURE
} from '../constants/index';

const initialState = {
  gameId: '',
  gameTitle: '',
  thumbnail: '',
  isPlaying: false,
  createdBy: '',
  participants: [],
  playResult: [],
  loading: false,
  error: null,
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_MAKE_GAME_START:
      return {
        ...state,
        loading: true
      };

    case REQUEST_MAKE_GAME_SUCCESS:
      const { gameId, gameTitle, thumbnail, isPlaying, createdBy, participants, playResult } = action;

      return {
        ...state,
        loading: false,
        gameId,
        gameTitle,
        thumbnail,
        isPlaying,
        createdBy,
        participants,
        playResult
      };

    case REQUEST_MAKE_GAME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

