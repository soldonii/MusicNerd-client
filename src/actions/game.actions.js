import { getSocket } from '../lib/socket';

import {
  UPDATE_GAME_CREATOR,
  UPDATE_PARTICIPANTS,
  UPDATE_READY_STATUS,
  UPDATE_CHAT_MESSAGES
} from '../constants/index';

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
