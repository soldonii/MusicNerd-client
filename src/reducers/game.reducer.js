import {
  RESET_GAME_STATE,
  UPDATE_GAME_CREATOR,
  UPDATE_PARTICIPANTS,
  UPDATE_READY_STATUS,
  UPDATE_CHAT_MESSAGES,
  UPDATE_TRACK_URL,
  UPDATE_SCORE
} from '../constants/index';

const initialState = {
  gameCreator: '',
  participants: [],
  readyStatus: {},
  chatMessages: [],
  score: {},
  trackUrl: '',
  loading: false,
  error: null
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_GAME_STATE:
      return {
        gameCreator: '',
        participants: [],
        readyStatus: {},
        chatMessages: [],
        loading: false,
        error: null
      };

    case UPDATE_GAME_CREATOR:
      return {
        ...state,
        gameCreator: action.gameCreator
      };

    case UPDATE_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants
      };

    case UPDATE_READY_STATUS:
      return {
        ...state,
        readyStatus: action.readyStatus
      };

    case UPDATE_CHAT_MESSAGES:
      return {
        ...state,
        chatMessages: [ ...state.chatMessages, action.message ]
      };

    case UPDATE_TRACK_URL:
      return {
        ...state,
        trackUrl: action.trackUrl
      };

    case UPDATE_SCORE:
      const { username, trackurl } = action;
      const updatedScore = state.score[username] ? state.score[username] + 10 : 10;

      return {
        ...state,
        score: { ...state.score, [username]: updatedScore },
        trackurl
      };

    default:
      return state;
  }
};

