import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import FavoriteArtists from '../components/users/FavoriteArtists';
import Profile from '../components/users/Profile';
import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';

import { logout } from '../actions/auth.actions';
import {
  getArtists,
  selectArtist,
  deselectArtist,
  saveFavoriteArtists,
  getProfile
} from '../actions/user.actions';

const UserContainer = () => {
  const dispatch = useDispatch();

  const userId = useSelector(({ auth }) => auth.userId);
  const artistList = useSelector(({ user }) => user.artistList);
  const selectedArtists = useSelector(({ user }) => user.selectedArtists);
  const userProfile = useSelector(({ user }) => user.userProfile);
  const loading = useSelector(({ user }) => user.loading);

  useEffect(() => {
    dispatch(getArtists(userId));
    // eslint-disable-next-line
  }, [ userId ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        {window.location.pathname.includes('profile') ?
          <Fragment>
            <Link to='/waiting'>Game</Link>
            <button onClick={dispatch(logout)}>Logout</button>
          </Fragment> :
          Object.keys(selectedArtists).length >= 5 &&
            <button onClick={() => dispatch(saveFavoriteArtists(userId, selectedArtists))}>Next</button>}
      </Navbar>
      <Route exact path={`/users/${userId}/favorites`}>
        <FavoriteArtists
          loading={loading}
          artistList={artistList}
          selectedArtists={selectedArtists}
          onSelect={selectArtist}
          onDeselect={deselectArtist}
        />
      </Route>
      <Route exact path={`/users/${userId}/profile`}>
        <Profile
          userId={userId}
          userProfile={userProfile}
          requestData={getProfile}
        />
      </Route>
    </Fragment>
  );
};

export default UserContainer;
