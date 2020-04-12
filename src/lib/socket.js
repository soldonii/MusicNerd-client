import io from 'socket.io-client';

let socket;

export const connectSocket = () => {
  console.log('connect socket');
  socket = io('http://localhost:8080');
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  socket.emit('disconnect');
  socket.off();
};

export const joinRoom = (userId, gameId) => {
  socket.emit('join room', { userId, gameId });
};

export const requestGameHost = gameId => {
  socket.emit('request game host', gameId);
};

export const leaveRoom = (userId, gameId) => {
  socket.emit('leave room', { userId, gameId });
};

export const onReady = userId => {
  socket.emit('on ready', userId);
};

export const offReady = userId => {
  socket.emit('off ready', userId);
};

export const sendMessage = message => {
  socket.emit('send message', message);
};

export const requestGameStart = players => {
  socket.emit('request game start', players);
};

export const requestNewTrack = () => {
  socket.emit('request new track');
};


