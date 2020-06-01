import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import DefaultLayout from '../components/layout/DefaultLayout';
import WatingRoom from '../components/waiting/WatingRoom';
import logo from '../assets/logo.png';

import { connectSocket, disconnectSocket } from '../lib/socket';

import { logout } from '../actions/auth.actions';
import { createGame, getGames, enterGame } from '../actions/waiting.actions';

const WatingContainer = () => {
  const dispatch = useDispatch();

  const userId = useSelector(({ auth }) => auth.userId);
  const gameList = useSelector(({ waiting }) => waiting.gameList);
  const loading = useSelector(({ waiting }) => waiting.loading);
  const createGameLoading = useSelector(({ waiting }) => waiting.createGameLoading);
  const getGameListError = useSelector(({ waiting }) => waiting.getGameListError);
  const createGameError = useSelector(({ waiting }) => waiting.createGameError);

  useEffect(() => {
    connectSocket();
    dispatch(getGames());

    return () => disconnectSocket();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Navbar logo={logo}>
        <Link to={`/users/${userId}/profile`}>Profile</Link>
        <button onClick={() => dispatch(logout)}>Logout</button>
      </Navbar>
      <DefaultLayout>
        <WatingRoom
          userId={userId}
          gameList={gameList}
          loading={loading}
          createGameLoading={createGameLoading}
          getGameListError={getGameListError}
          createGameError={createGameError}
          createGame={createGame}
          enterGame={enterGame}
        />
      </DefaultLayout>
    </Fragment>
  );
};

export default WatingContainer;
