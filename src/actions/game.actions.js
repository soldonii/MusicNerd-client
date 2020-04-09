import { getSocket } from '../lib/socket';

import {
  JOIN_ROOM,
  LEAVE_ROOM,
  UPDATE_PARTICIPANTS,
} from '../constants/index';

export const joinRoom = dispatch => (userId, gameId) => {
  const socket = getSocket();
  socket.emit('enter room', { userId, gameId });

  dispatch({ type: JOIN_ROOM });
};

export const leaveRoom = dispatch => (userId, gameId) => {
  const socket = getSocket();
  socket.emit('leave room', { userId, gameId });

  dispatch({ type: LEAVE_ROOM });
};

export const updateParticipants = dispatch => () => {
  const socket = getSocket();
  socket.on('participants', participants => {
    dispatch({ type: UPDATE_PARTICIPANTS, participants });
  });
};



// export const connectSocket = () => socket = io('http://localhost:8080');

// export const updateParticipants = dispatch => () => {
//   const participants = getParticipants();
//   console.log('in actions..', participants);

//   dispatch({ type: UPDATE_PARTICIPANTS, participants });
// };




// export const updateParticipants = dispatch => participants => {
//   dispatch({ type: UPDATE_PARTICIPANTS, participants });
// };
