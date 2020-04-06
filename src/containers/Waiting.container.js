import React, { useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/layout/Navbar';
import DefaultLayout from '../components/layout/DefaultLayout';
import WatingRoom from '../components/waiting/WatingRoom';
import logo from '../assets/logo.png';

import { logout } from '../actions/auth.actions';
import { postGame, fetchGames, enterGame } from '../actions/waiting.actions';

const WatingContainer = ({
  userId,
  createdGameId,
  enterGameId,
  allGames,
  loading,
  error,
  logout,
  postGame,
  fetchGames,
  enterGame
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
          createdGameId={createdGameId}
          enterGameId={enterGameId}
          allGames={allGames}
          loading={loading}
          error={error}
          postGame={postGame}
          fetchGames={fetchGames}
          enterGame={enterGame}
        />
      </DefaultLayout>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  createdGameId: state.waiting.createdGameId,
  enterGameId: state.waiting.enterGameId,
  allGames: state.waiting.allGames,
  loading: state.waiting.loading,
  error: state.waiting.error
});

const mapDispatchToProps = dispatch => ({
  logout: logout(dispatch),
  postGame: postGame(dispatch),
  fetchGames: fetchGames(dispatch),
  enterGame: enterGame(dispatch)
});

WatingContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  createdGameId: PropTypes.string.isRequired,
  enterGameId: PropTypes.string.isRequired,
  allGames: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  logout: PropTypes.func.isRequired,
  postGame: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  enterGame: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(WatingContainer);
