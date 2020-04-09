import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/layout/Navbar';
import DefaultLayout from '../components/layout/DefaultLayout';
import WatingRoom from '../components/waiting/WatingRoom';
import logo from '../assets/logo.png';

import { logout } from '../actions/auth.actions';
import { connectSocket, disconnectSocket } from '../lib/socket';
import history from '../lib/history';
import { createGame, getGames, enterGame, clearError } from '../actions/waiting.actions';

const WatingContainer = ({
  userId,
  gameList,
  loading,
  error,
  logout,
  createGame,
  getGames,
  enterGame,
  clearError
}) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    (!token || !userId) && history.push('/');
  }, [ token, userId ]);

  useEffect(() => {
    connectSocket();
    getGames();

    return () => disconnectSocket();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      window.alert('방에 입장할 수 없습니다!');
      clearError();
    }

    // eslint-disable-next-line
  }, [ error ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        <Link to='/users/:userId/profile'>Profile</Link>
        {token ? <button onClick={logout}>Logout</button> : <Link to='/auth/login'>Login</Link>}
      </Navbar>
      <DefaultLayout>
        <WatingRoom
          userId={userId}
          gameList={gameList}
          loading={loading}
          error={error}
          createGame={createGame}
          enterGame={enterGame}
        />
      </DefaultLayout>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  gameList: state.waiting.gameList,
  loading: state.waiting.loading,
  error: state.waiting.error
});

const mapDispatchToProps = dispatch => ({
  logout: logout(dispatch),
  createGame: createGame(dispatch),
  getGames: getGames(dispatch),
  enterGame: enterGame(dispatch),
  clearError: clearError(dispatch)
});

WatingContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  gameList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  logout: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  getGames: PropTypes.func.isRequired,
  enterGame: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(WatingContainer);
