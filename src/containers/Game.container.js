import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GameRoom from '../components/game/GameRoom';

import {
  updateGameHost,
  updatePlayers,
  updateReadyStatus,
  updateChatMessages,
  updateGameStatus,
  updateCurrentTrack,
  updateScoreAndPlayLog,
  updatePlayLog,
  resetGameState,
} from '../actions/game.actions';

import {
  joinRoom,
  requestGameHost,
  disconnectSocket
} from '../lib/socket';

const GameContainer = ({
  userId,
  gameId,
  socket,
  gameHost,
  players,
  readyStatus,
  chatMessages,
  isGameReady,
  score,
  loading,
  error,
  currentTrack,
  playLog,
  resetGameState,
  updatePlayers,
  updateReadyStatus,
  updateGameHost,
  updateChatMessages,
  updateCurrentTrack,
  updateScoreAndPlayLog,
  updatePlayLog,
  updateGameStatus
}) => {
  useEffect(() => {
    if (userId && gameId) {
      joinRoom(userId, gameId);
      requestGameHost(gameId);
    }

    // return () => disconnectSocket();
    // eslint-disable-next-line
  }, [ userId, gameId ]);

  useEffect(() => {
    updateGameHost(socket);
    updatePlayers(socket);
    updateReadyStatus(socket);
    updateChatMessages(socket);
    updateGameStatus(socket);
    updateCurrentTrack(socket);
    updateScoreAndPlayLog(socket);

    return () => {
      disconnectSocket();
      resetGameState();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Route path={`/games/${gameId}`}>
      <GameRoom
        userId={userId}
        gameId={gameId}
        gameHost={gameHost}
        players={players}
        readyStatus={readyStatus}
        chatMessages={chatMessages}
        isGameReady={isGameReady}
        currentTrack={currentTrack}
        score={score}
        playLog={playLog}
        loading={loading}
        error={error}
        updatePlayLog={updatePlayLog}
      />
    </Route>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  gameId: state.waiting.gameId,
  gameHost: state.game.gameHost,
  players: state.game.players,
  readyStatus: state.game.readyStatus,
  chatMessages: state.game.chatMessages,
  isGameReady: state.game.isGameReady,
  currentTrack: state.game.currentTrack,
  score: state.game.score,
  playLog: state.game.playLog,
  loading: state.game.loading,
  error: state.game.error
});

const mapDispatchToProps = dispatch => ({
  updateGameHost: updateGameHost(dispatch),
  updatePlayers: updatePlayers(dispatch),
  updateReadyStatus: updateReadyStatus(dispatch),
  updateChatMessages: updateChatMessages(dispatch),
  updateGameStatus: updateGameStatus(dispatch),
  updateCurrentTrack: updateCurrentTrack(dispatch),
  updateScoreAndPlayLog: updateScoreAndPlayLog(dispatch),
  updatePlayLog: updatePlayLog(dispatch),
  resetGameState: resetGameState(dispatch)
});

GameRoom.propTypes = {
  userId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  gameHost: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  readyStatus: PropTypes.object.isRequired,
  chatMessages: PropTypes.array.isRequired,
  isGameReady: PropTypes.bool.isRequired,
  currentTrack: PropTypes.string.isRequired,
  score: PropTypes.object.isRequired,
  playLog: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
