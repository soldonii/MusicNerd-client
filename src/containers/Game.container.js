import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GameRoom from '../components/game/GameRoom';

import {
  updateGameHost,
  updatePlayersAndReadyStatus,
  updateReadyStatus,
  updateChatMessages,
  updateGameStatus,
  updateCurrentTrack,
  updateScoreAndPlayLog,
  updatePlayLog,
  updateFinalScore,
  resetGameState,
} from '../actions/game.actions';

import {
  joinRoom,
  requestGameHost,
  disconnectSocket
} from '../lib/socket';

const GameContainer = ({
  updatePlayersAndReadyStatus,
  updateReadyStatus,
  updateGameHost,
  updateChatMessages,
  updateCurrentTrack,
  updateScoreAndPlayLog,
  updatePlayLog,
  updateFinalScore,
  updateGameStatus,
  resetGameState
}) => {
  const userId = useSelector(({ auth }) => auth.userId);
  const gameId = useSelector(({ waiting }) => waiting.gameId);
  const gameHost = useSelector(({ game }) => game.gameHost);
  const players = useSelector(({ game }) => game.players);
  const readyStatus = useSelector(({ game }) => game.readyStatus);
  const chatMessages = useSelector(({ game }) => game.chatMessages);
  const score = useSelector(({ game }) => game.score);
  const playLog = useSelector(({ game }) => game.playLog);
  const isGameReady = useSelector(({ game }) => game.isGameReady);
  const currentTrack = useSelector(({ game }) => game.currentTrack);
  const isGameEnded = useSelector(({ game }) => game.isGameEnded);
  const loading = useSelector(({ game }) => game.loading);
  const error = useSelector(({ game }) => game.error);

  useEffect(() => {
    if (userId && gameId) {
      joinRoom(userId, gameId);
      requestGameHost(gameId);
    }

    // eslint-disable-next-line
  }, [ userId, gameId ]);

  useEffect(() => {
    updateGameHost();
    updatePlayersAndReadyStatus();
    updateReadyStatus();
    updateChatMessages();
    updateGameStatus();
    updateCurrentTrack();
    updateScoreAndPlayLog();
    updateFinalScore();

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
        score={score}
        playLog={playLog}
        isGameReady={isGameReady}
        currentTrack={currentTrack}
        isGameEnded={isGameEnded}
        loading={loading}
        error={error}
        updatePlayLog={updatePlayLog}
      />
    </Route>
  );
};

const mapDispatchToProps = dispatch => ({
  updateGameHost: updateGameHost(dispatch),
  updatePlayersAndReadyStatus: updatePlayersAndReadyStatus(dispatch),
  updateReadyStatus: updateReadyStatus(dispatch),
  updateChatMessages: updateChatMessages(dispatch),
  updateGameStatus: updateGameStatus(dispatch),
  updateCurrentTrack: updateCurrentTrack(dispatch),
  updateScoreAndPlayLog: updateScoreAndPlayLog(dispatch),
  updatePlayLog: updatePlayLog(dispatch),
  updateFinalScore: updateFinalScore(dispatch),
  resetGameState: resetGameState(dispatch)
});

GameRoom.propTypes = {
  updatePlayersAndReadyStatus: PropTypes.func,
  updateReadyStatus: PropTypes.func,
  updateGameHost: PropTypes.func,
  updateChatMessages: PropTypes.func,
  updateCurrentTrack: PropTypes.func,
  updateScoreAndPlayLog: PropTypes.func,
  updatePlayLog: PropTypes.func,
  updateFinalScore: PropTypes.func,
  updateGameStatus: PropTypes.func,
  resetGameState: PropTypes.func
};

export default connect(null, mapDispatchToProps)(GameContainer);
