import {
  RESET_GAME_STATE,
  UPDATE_GAME_CREATOR,
  UPDATE_PARTICIPANTS,
  UPDATE_READY_STATUS,
  UPDATE_CHAT_MESSAGES,
  UPDATE_GAME_STATUS,
  UPDATE_CURRENT_TRACK,
  UPDATE_SCORE
} from '../constants/index';

const initialState = {
  gameCreator: '',
  participants: [],
  readyStatus: {},
  chatMessages: [],
  score: {},
  playLog: [],
  isGameReady: false,
  currentTrack: '',
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

    case UPDATE_GAME_STATUS:
      return {
        ...state,
        isGameReady: true
      };

    case UPDATE_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.currentTrack
      };

    case UPDATE_SCORE:
      const { username, message } = action.messageObj;
      const updatedScore = state.score[username] ? state.score[username] + 10 : 10;

      return {
        ...state,
        score: { ...state.score, [username]: updatedScore },
        chatMessages: [ ...state.chatMessages, { [username]: message } ],
        playLog: [ ...state.playLog, username ]
      };

    default:
      return state;
  }
};

