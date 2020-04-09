import {
  UPDATE_GAME_CREATOR,
  UPDATE_PARTICIPANTS,
  UPDATE_READY_STATUS,
  UPDATE_CHAT_MESSAGES
} from '../constants/index';

const initialState = {
  gameCreator: '',
  participants: [],
  readyStatus: {},
  chatMessages: [],
  loading: false,
  error: null
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

