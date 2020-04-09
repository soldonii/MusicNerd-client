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
  updateTrackUrl,
  updateScore
} from '../actions/game.actions';

import {
  joinRoom,
  requestGameCreator,
  disconnectSocket
} from '../lib/socket';

const GameContainer = ({
  userId,
  gameId,
  gameCreator,
  participants,
  readyStatus,
  chatMessages,
  score,
  loading,
  error,
  trackUrl,
  resetGameState,
  updateParticipants,
  updateReadyStatus,
  updateGameCreator,
  updateChatMessages,
  updateTrackUrl,
  updateScore
}) => {
  useEffect(() => {
    joinRoom(userId, gameId);
    requestGameCreator(gameId);

    return () => disconnectSocket();
    // eslint-disable-next-line
  }, [ userId, gameId ]);

  useEffect(() => {
    updateParticipants();
    updateReadyStatus();
    updateGameCreator();
    updateChatMessages();
    updateTrackUrl();
    updateScore();

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
        score={score}
        loading={loading}
        error={error}
        trackUrl={trackUrl}
        resetGameState={resetGameState}
      />
    </Route>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  gameId: state.waiting.gameId,
  gameCreator: state.game.gameCreator,
  participants: state.game.participants,
  readyStatus: state.game.readyStatus,
  chatMessages: state.game.chatMessages,
  score: state.game.score,
  trackUrl: state.game.trackUrl,
  loading: state.game.loading,
  error: state.game.error
});

const mapDispatchToProps = dispatch => ({
  resetGameState: resetGameState(dispatch),
  updateParticipants: updateParticipants(dispatch),
  updateReadyStatus: updateReadyStatus(dispatch),
  updateGameCreator: updateGameCreator(dispatch),
  updateChatMessages: updateChatMessages(dispatch),
  updateTrackUrl: updateTrackUrl(dispatch),
  updateScore: updateScore(dispatch)
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
