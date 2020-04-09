import { getSocket } from '../lib/socket';

import {
  RESET_GAME_STATE,
  UPDATE_GAME_CREATOR,
  UPDATE_PARTICIPANTS,
  UPDATE_READY_STATUS,
  UPDATE_CHAT_MESSAGES,
  UPDATE_TRACK_URL,
  UPDATE_SCORE
} from '../constants/index';

export const resetGameState = dispatch => () => {
  dispatch({ type: RESET_GAME_STATE });
};

export const updateGameCreator = dispatch => () => {
  const socket = getSocket();
  socket.on('gameCreator', gameCreator => {
    dispatch({ type: UPDATE_GAME_CREATOR, gameCreator });
  });
}

export const updateParticipants = dispatch => () => {
  const socket = getSocket();
  socket.on('participants', participants => {
    dispatch({ type: UPDATE_PARTICIPANTS, participants });
  });
};

export const updateReadyStatus = dispatch => () => {
  const socket = getSocket();
  socket.on('ready status', readyStatus => {
    dispatch({ type: UPDATE_READY_STATUS, readyStatus });
  });
};

export const updateChatMessages = dispatch => () => {
  const socket = getSocket();
  socket.on('chat messages', message => {
    dispatch({ type: UPDATE_CHAT_MESSAGES, message });
  });
};

export const updateTrackUrl = dispatch => () => {
  const socket = getSocket();
  socket.on('send a track', trackUrl => {
    dispatch({ type: UPDATE_TRACK_URL, trackUrl });
  });
};

export const updateScore = dispatch => () => {
  const socket = getSocket();
  // socket.on('correct answer', data => {
  //   console.log('data on correct answer', data);
  // });
  socket.on('correct answer', ({ username, trackUrl }) => {
    console.log('username', username)
    console.log('trackUrl', trackUrl);
    dispatch({ type: UPDATE_SCORE, username, trackUrl });
  });
};

// export const startGame = dispatch => () => {
//   const socket = getSocket();
//   socket.on('start game', () => {
//     dispatch({ type: START_GAME });
//   });
// };


