import React, { useEffect, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/layout/Navbar';
import FavoriteArtists from '../components/users/FavoriteArtists';
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
  onSelect,
  onDeselect,
  postData
}) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    setTokenToHeader(token);
  }, []);

  useEffect(() => {
    if (!token || !userId ) {
      return history.push('/');
    }

    if (postResult === 'success') {
      return history.push('/waiting');
    }

    getArtists(userId);

    // eslint-disable-next-line
  }, [ token, userId, postResult ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        {Object.keys(selectedArtists).length >= 5
          && <button onClick={() => postData(userId, selectedArtists)}>Next</button>}
      </Navbar>
      <Route exact path={`/users/${userId}/favorites`}>
        <FavoriteArtists
          loading={loading}
          artistList={artistList}
          selectedArtists={selectedArtists}
          onSelect={onSelect}
          onDeselect={onDeselect}
        />
      </Route>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  loading: state.artist.loading,
  artistList: state.artist.artistList,
  selectedArtists: state.artist.selectedArtists,
  postResult: state.artist.result
});

const mapDispatchToProps = dispatch => ({
  getArtists: getArtists(dispatch),
  onSelect: selectArtist(dispatch),
  onDeselect: deselectArtist(dispatch),
  postData: saveFavoriteArtists(dispatch)
});

UserContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  artistList: PropTypes.array.isRequired,
  selectedArtists: PropTypes.object.isRequired,
  postResult: PropTypes.string.isRequired,
  getArtists: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  postData: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
