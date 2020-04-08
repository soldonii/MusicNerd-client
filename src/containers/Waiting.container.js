import React, { useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/layout/Navbar';
import DefaultLayout from '../components/layout/DefaultLayout';
import WatingRoom from '../components/waiting/WatingRoom';
import logo from '../assets/logo.png';

import { logout } from '../actions/auth.actions';
import { createGame, getGames, enterGame, clearError } from '../actions/waiting.actions';

const WatingContainer = ({
  userId,
  gameId,
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
  const history = useHistory();

  useEffect(() => {
    (!token || !userId) && history.push('/');

    // eslint-disable-next-line
  }, [ token, userId ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        <Link to='/users/:userId/profile'>Profile</Link>
        {token ? <button onClick={logout}>Logout</button> : <Link to='/auth/login'>Login</Link>}
      </Navbar>
      <DefaultLayout>
        <WatingRoom
          userId={userId}
          gameId={gameId}
          gameList={gameList}
          loading={loading}
          error={error}
          createGame={createGame}
          getGames={getGames}
          enterGame={enterGame}
          clearError={clearError}
        />
      </DefaultLayout>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  gameId: state.waiting.gameId,
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
  gameId: PropTypes.string.isRequired,
  gameList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  logout: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  getGames: PropTypes.func.isRequired,
  enterGame: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(WatingContainer);
