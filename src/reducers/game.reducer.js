import {
  UPDATE_GAME_HOST,
  UPDATE_PLAYERS,
  UPDATE_READY_STATUS,
  UPDATE_CHAT_MESSAGES,
  UPDATE_GAME_STATUS,
  UPDATE_CURRENT_TRACK,
  UPDATE_SCORE_AND_PLAYLOG,
  UPDATE_PLAYLOG_ONLY,
  RESET_GAME_STATE
} from '../constants/index';

const initialState = {
  gameHost: '',
  players: [],
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
    case UPDATE_GAME_HOST:
      return {
        ...state,
        gameHost: action.gameHost
      };

    case UPDATE_PLAYERS:
      return {
        ...state,
        players: action.players
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

    case UPDATE_SCORE_AND_PLAYLOG:
      const { username, message } = action.messageObj;
      const updatedScore = state.score[username] ? state.score[username] + 10 : 10;

      return {
        ...state,
        score: { ...state.score, [username]: updatedScore },
        chatMessages: [ ...state.chatMessages, { [username]: message } ],
        playLog: [ ...state.playLog, username ]
      };

    case UPDATE_PLAYLOG_ONLY:
      return {
        ...state,
        playLog: [ ...state.playLog, null ]
      };

    case RESET_GAME_STATE:
      return {
        gameHost: '',
        players: [],
        readyStatus: {},
        chatMessages: [],
        loading: false,
        error: null
      };

    default:
      return state;
  }
};

