import {
  UPDATE_PARTICIPANTS,
} from '../constants/index';

const initialState = {
  gameId: '',
  participants: [],
  chatMessages: [], // { userId, chatMessage } 형태의 객체여야 함
  loading: false,
  error: null
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants
      };

    default:
      return state;
  }
};

