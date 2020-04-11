import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GameRoom from '../components/game/GameRoom';

import {
  resetGameState,
  updateParticipants,
  updateReadyStatus,
  updateGameCreator,
  updateChatMessages,
  updateCurrentTrack,
  updateScore,
  updateGameStatus
} from '../actions/game.actions';

import {
  joinRoom,
  requestGameCreator,
  disconnectSocket
} from '../lib/socket';

const GameContainer = ({
  userId,
  gameId,
  socket,
  gameCreator,
  participants,
  readyStatus,
  chatMessages,
  isGameReady,
  score,
  loading,
  error,
  currentTrack,
  playLog,
  recentScorer,
  resetGameState,
  updateParticipants,
  updateReadyStatus,
  updateGameCreator,
  updateChatMessages,
  updateCurrentTrack,
  updateScore,
  updateGameStatus
}) => {
  useEffect(() => {
    if (userId && gameId) {
      joinRoom(userId, gameId);
      console.log('joinroom');
      requestGameCreator(gameId);
    }

    return () => disconnectSocket();
    // eslint-disable-next-line
  }, [ userId, gameId ]);

  useEffect(() => {
    updateParticipants(socket);
    updateReadyStatus(socket);
    updateGameCreator(socket);
    updateChatMessages(socket);
    updateCurrentTrack(socket);
    updateScore(socket);
    updateGameStatus(socket);

    return () => disconnectSocket();
    // eslint-disable-next-line
  }, []);

  return (
    <Route path={`/games/${gameId}`}>
      <GameRoom
        userId={userId}
        gameId={gameId}
        gameCreator={gameCreator}
        participants={participants}
        readyStatus={readyStatus}
        chatMessages={chatMessages}
        isGameReady={isGameReady}
        score={score}
        loading={loading}
        playLog={playLog}
        error={error}
        currentTrack={currentTrack}
        recentScorer={recentScorer}
        resetGameState={resetGameState}
      />
    </Route>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  gameId: state.waiting.gameId,
  socket: state.waiting.socket,
  gameCreator: state.game.gameCreator,
  participants: state.game.participants,
  readyStatus: state.game.readyStatus,
  chatMessages: state.game.chatMessages,
  score: state.game.score,
  isGameReady: state.game.isGameReady,
  currentTrack: state.game.currentTrack,
  recentScorer: state.game.recentScorer,
  playLog: state.game.playLog,
  loading: state.game.loading,
  error: state.game.error
});

const mapDispatchToProps = dispatch => ({
  resetGameState: resetGameState(dispatch),
  updateParticipants: updateParticipants(dispatch),
  updateReadyStatus: updateReadyStatus(dispatch),
  updateGameCreator: updateGameCreator(dispatch),
  updateChatMessages: updateChatMessages(dispatch),
  updateCurrentTrack: updateCurrentTrack(dispatch),
  updateScore: updateScore(dispatch),
  updateGameStatus: updateGameStatus(dispatch)
});

GameRoom.propTypes = {
  userId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  gameCreator: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired,
  readyStatus: PropTypes.object.isRequired,
  chatMessages: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
