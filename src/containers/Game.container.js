import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GameRoom from '../components/game/GameRoom';

import { updateParticipants, updateReadyStatus, updateGameCreator, updateChatMessages } from '../actions/game.actions';
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
  loading,
  error,
  updateParticipants,
  updateReadyStatus,
  updateGameCreator,
  updateChatMessages
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
        loading={loading}
        error={error}
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
  loading: state.game.loading,
  error: state.game.error
});

const mapDispatchToProps = dispatch => ({
  updateParticipants: updateParticipants(dispatch),
  updateReadyStatus: updateReadyStatus(dispatch),
  updateGameCreator: updateGameCreator(dispatch),
  updateChatMessages: updateChatMessages(dispatch)
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
