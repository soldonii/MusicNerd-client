import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateParticipants } from '../actions/game.actions';
import GameRoom from '../components/game/GameRoom';

const GameContainer = ({
  userId,
  gameId,
  participants,
  chatMessages,
  loading,
  error,
  updateParticipants
}) => {
  return (
    <Route path={`/games/${gameId}`}>
      <GameRoom
        userId={userId}
        gameId={gameId}
        participants={participants}
        chatMessages={chatMessages}
        loading={loading}
        error={error}
        updateParticipants={updateParticipants}
      />
    </Route>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  gameId: state.waiting.gameId,
  participants: state.game.participants,
  chatMessages: state.game.chatMessages,
  loading: state.game.loading,
  error: state.game.error
});

const mapDispatchToProps = dispatch => ({
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
