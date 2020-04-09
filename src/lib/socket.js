import io from 'socket.io-client';

let socket;

export const connectSocket = () => {
  socket = io('http://localhost:8080');
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  socket.emit('disconnect');
  socket.off();
};

