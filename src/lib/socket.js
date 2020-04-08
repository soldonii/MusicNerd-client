import io from 'socket.io-client';

let socket;

export const connectSocket = () => socket = io('http://localhost:8080');

export const disconnectSocket = () => socket.off();

export const enterRoom = (userId, gameId) => {
  socket.emit('enter room', { userId, gameId });
};

export const updateParticipants = () => {
  console.log('update participants in socket.js')
  socket.on('participants', data => {
    console.log('participants', data);
  });
};


