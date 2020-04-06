import React, { useEffect, Fragment } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/layout/Navbar';
import DefaultLayout from '../components/layout/DefaultLayout';
import WatingRoom from '../components/waiting/WatingRoom';

import { requestLogout } from '../actions/auth.actions';
import { requestMakeGame, fetchGames } from '../actions/waiting.actions';
import logo from '../assets/logo.png';

const WatingContainer = ({
  userId,
  gameId,
  allGames,
  loading,
  error,
  requestLogout,
  requestMakeGame,
  fetchGames
}) => {
  const token = localStorage.getItem('token');
  const history = useHistory();

  useEffect(() => {
    !token && history.push('/');

    // eslint-disable-next-line
  }, [ token ]);

  return (
      <Fragment>
        <Navbar logo={logo}>
          <Link to='/users/:userId/profile'>Profile</Link>
          {token ? <button onClick={requestLogout}>Logout</button> : <Link to='/auth/login'>Login</Link>}
        </Navbar>
        <Switch>
          <Route exact path='/waiting'>
            <DefaultLayout>
              <WatingRoom
                userId={userId}
                gameId={gameId}
                loading={loading}
                error={error}
                allGames={allGames}
                requestMakeGame={requestMakeGame}
                fetchGames={fetchGames}
              />
            </DefaultLayout>
          </Route>
        </Switch>
      </Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  gameId: state.waiting.createdGameId,
  allGames: state.waiting.allGames,
  loading: state.waiting.loading,
  error: state.waiting.error
});

const mapDispatchToProps = dispatch => ({
  requestLogout: requestLogout(dispatch),
  requestMakeGame: requestMakeGame(dispatch),
  fetchGames: fetchGames(dispatch)
});

WatingContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  allGames: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  requestLogout: PropTypes.func.isRequired,
  requestMakeGame: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatingContainer);
