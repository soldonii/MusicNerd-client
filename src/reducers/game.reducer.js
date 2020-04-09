import {
  JOIN_ROOM,
  LEAVE_ROOM,
  UPDATE_PARTICIPANTS,
} from '../constants/index';

const initialState = {
  hasJoined: false,
  participants: [],
  chatMessages: [], // { userId, chatMessage } 형태의 객체여야 함
  loading: false,
  error: null
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_ROOM:
      return {
        ...state,
        hasJoined: true
      };

    case LEAVE_ROOM:
      return {
        hasJoined: false,
        participants: [],
        chatMessages: [],
        loading: false,
        error: null
      };

    case UPDATE_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants
      };

    default:
      return state;
  }
};

