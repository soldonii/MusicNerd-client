import { getSocket } from '../lib/socket';

import {
  RESET_GAME_STATE,
  UPDATE_GAME_CREATOR,
  UPDATE_PARTICIPANTS,
  UPDATE_READY_STATUS,
  UPDATE_CHAT_MESSAGES,
  UPDATE_CURRENT_TRACK,
  UPDATE_SCORE,
  UPDATE_GAME_STATUS
} from '../constants/index';

export const resetGameState = dispatch => () => {
  dispatch({ type: RESET_GAME_STATE });
};

export const updateGameCreator = dispatch => (sk) => {
  const socket = getSocket();
  socket.on('gameCreator', gameCreator => {
    dispatch({ type: UPDATE_GAME_CREATOR, gameCreator });
  });
}

export const updateParticipants = dispatch => (sk) => {
  const socket = getSocket();
  socket.on('participants', participants => {
    dispatch({ type: UPDATE_PARTICIPANTS, participants });
  });
};

export const updateReadyStatus = dispatch => (sk) => {
  const socket = getSocket();
  socket.on('ready status', readyStatus => {
    dispatch({ type: UPDATE_READY_STATUS, readyStatus });
  });
};

export const updateChatMessages = dispatch => (sk) => {
  const socket = getSocket();
  socket.on('chat messages', message => {
    dispatch({ type: UPDATE_CHAT_MESSAGES, message });
  });
};

export const updateGameStatus = dispatch => () => {
  const socket = getSocket();
  socket.on('ready to start', () => {
    dispatch({ type: UPDATE_GAME_STATUS });
  });
};

export const updateCurrentTrack = dispatch => (sk) => {
  const socket = getSocket();
  socket.on('send a track', currentTrack => {
    dispatch({ type: UPDATE_CURRENT_TRACK, currentTrack });
  });
};

export const updateScore = dispatch => (sk) => {
  const socket = getSocket();
  socket.on('correct answer', messageObj => {
    dispatch({ type: UPDATE_SCORE, messageObj });
  });
};

// export const startGame = dispatch => () => {
//   const socket = getSocket();
//   socket.on('start game', () => {
//     dispatch({ type: START_GAME });
//   });
// };


