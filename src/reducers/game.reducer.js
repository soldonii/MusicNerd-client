import {
  CONNECT_SOCKET_REQUEST,
  CONNECT_SOCKET_SUCCESS,
  CONNECT_SOCKET_FAILED
} from '../constants/index';

const initialState = {
  username: '',
  gameId: '',
  gameTitle: '',
  createdBy: '',
  isPlaying: false,
  participants: [],
  chatMessages: [], // { userId, chatMessage } 형태의 객체여야 함
  score: {}, // { userId: points } 형태의 객체
  readyStatus: {}, // { userid: true }와 같은 식. 모든 user true이면 방장은 게임 시작할 수 있음
  playList: [], // 재생된 음악 list,
  loading: false,
  error: null
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_SOCKET_REQUEST:
      return {
        ...state,
        loading: true
      };

    case CONNECT_SOCKET_SUCCESS:
      const {
        is_playing: isPlaying,
        participants,
        _id: gameId,
        game_title: gameTitle,
        created_by: createdBy,
        score } = action.game;

      return {
        ...state,
        loading: false,
        username: action.username,
        gameId,
        gameTitle,
        createdBy,
        isPlaying,
        participants,
        score,
        error: null
      };

    case CONNECT_SOCKET_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

