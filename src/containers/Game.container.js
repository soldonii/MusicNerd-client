import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { connectSocket } from '../actions/game.actions';
import GameRoom from '../components/game/GameRoom';

const GameContainer = ({
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
  return (
    <Route exact path={`/games/${gameId}`}>
      <GameRoom
        username={username}
        gameId={gameId}
        gameTitle={gameTitle}
        createdBy={createdBy}
        isPlaying={isPlaying}
        participants={participants}
        chatMessages={chatMessages}
        score={score}
        readyStatus={readyStatus}
        playList={playList}
        loading={loading}
        error={error}
        connectSocket={connectSocket}
      />
    </Route>
  );
};

const mapStateToProps = state => ({
  gameId: state.waiting.gameId,
  username: state.game.username,
  gameTitle: state.game.gameTitle,
  createdBy: state.game.createdBy,
  isPlaying: state.game.isPlaying,
  participants: state.game.participants,
  chatMessages: state.game.chatMessages,
  score: state.game.score,
  readyStatus: state.game.readyStatus,
  playList: state.game.playList,
  loading: state.game.loading,
  error: state.game.error
});

const mapDispatchToProps = dispatch => ({
  connectSocket: connectSocket(dispatch)
});

GameRoom.propTypes = {
  username: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  gameTitle: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  participants: PropTypes.array.isRequired,
  chatMessages: PropTypes.array.isRequired,
  score: PropTypes.object.isRequired,
  readyStatus: PropTypes.object.isRequired,
  playList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  connectSocket: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
