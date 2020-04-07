import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

let socket;

const GameRoom = ({
  username,
  gameId,
  gameTitle,
  createdBy,
  isPlaying,
  participants,
  chatMessages,
  score,
  readyStatus,
  playList,
  loading,
  error,
  connectSocket
}) => {
  useEffect(() => {
    connectSocket(gameId);

    socket = io(`http://localhost:8080/games/${gameId}`);
    socket.emit('connect', { message: 'hello' })

    // eslint-disable-next-line
  }, []);

  return <div>Game room</div>
};

export default GameRoom;

// useEffect(() => {
//   socket = io(SERVER_URI);
//   socket.emit("room creation", { username, roomname });

//   return () => {
//     socket.emit("disconnect");
//     socket.off();
//   }
// }, [ username, roomname ]);

// useEffect(() => {
//   socket.emit("typing indicator", { message, username, roomname });
// }, [ message ]);

// useEffect(() => {
//   socket.on("message", message => updateMessages(message));
//   socket.on("room information", roomInfo => updateUserCount(roomInfo.users.length));
//   socket.on("indicator", ({ text }) => updateTypingIndicator(text));
// }, []);