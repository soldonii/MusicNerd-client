import React, { useEffect, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FavoriteArtists from '../components/users/FavoriteArtists';
import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';

import history from '../lib/history';
import { setTokenToHeader } from '../lib/auth';
import { getArtists, selectArtist, deselectArtist, saveFavoriteArtists } from '../actions/user.actions';

const UserContainer = ({
  userId,
  loading,
  artistList,
  selectedArtists,
  postResult,
  getArtists,
  selectArtist,
  deselectArtist,
  saveFavoriteArtists
}) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    setTokenToHeader(token);
  }, []);

  useEffect(() => {
    if (postResult === 'success') {
      return history.push('/waiting');
    }

    getArtists(userId);

    // eslint-disable-next-line
  }, [ userId, postResult ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        {Object.keys(selectedArtists).length >= 5
          && <button onClick={() => saveFavoriteArtists(userId, selectedArtists)}>Next</button>}
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
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  loading: state.user.loading,
  artistList: state.user.artistList,
  selectedArtists: state.user.selectedArtists,
  postResult: state.user.result
});

const mapDispatchToProps = dispatch => ({
  getArtists: getArtists(dispatch),
  selectArtist: selectArtist(dispatch),
  deselectArtist: deselectArtist(dispatch),
  saveFavoriteArtists: saveFavoriteArtists(dispatch)
});

UserContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  artistList: PropTypes.array.isRequired,
  selectedArtists: PropTypes.object.isRequired,
  postResult: PropTypes.string.isRequired,
  getArtists: PropTypes.func.isRequired,
  selectArtist: PropTypes.func.isRequired,
  deselectArtist: PropTypes.func.isRequired,
  saveFavoriteArtists: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
