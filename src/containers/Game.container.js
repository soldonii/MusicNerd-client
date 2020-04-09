import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { updateParticipants } from '../actions/game.actions';
import { joinRoom, leaveRoom, updateParticipants } from '../actions/game.actions';
import GameRoom from '../components/game/GameRoom';

const GameContainer = ({
  hasJoined,
  userId,
  gameId,
  participants,
  chatMessages,
  loading,
  error,
  joinRoom,
  leaveRoom,
  updateParticipants
}) => {
  return (
    <Route path={`/games/${gameId}`}>
      <GameRoom
        hasJoined={hasJoined}
        userId={userId}
        gameId={gameId}
        participants={participants}
        chatMessages={chatMessages}
        loading={loading}
        error={error}
        joinRoom={joinRoom}
        leaveRoom={leaveRoom}
        updateParticipants={updateParticipants}
      />
    </Route>
  );
};

const mapStateToProps = state => ({
  hasJoined: state.game.hasJoined,
  userId: state.auth.userId,
  gameId: state.waiting.gameId,
  participants: state.game.participants,
  chatMessages: state.game.chatMessages,
  loading: state.game.loading,
  error: state.game.error
});

const mapDispatchToProps = dispatch => ({
  joinRoom: joinRoom(dispatch),
  leaveRoom: leaveRoom(dispatch),
  updateParticipants: updateParticipants(dispatch)
});

GameRoom.propTypes = {
  userId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired,
  chatMessages: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
