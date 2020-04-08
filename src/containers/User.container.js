import React, { useEffect, Fragment } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/layout/Navbar';
import FavoriteArtists from '../components/users/FavoriteArtists';
import logo from '../assets/logo.png';

import { getArtists, selectArtist, deselectArtist, saveFavoriteArtists } from '../actions/user.actions';

const UserContainer = ({
  userId,
  loading,
  artistList,
  selectedArtists,
  postResult,
  requestData,
  onSelect,
  onDeselect,
  postData
}) => {
  const token = localStorage.getItem('token');
  const history = useHistory();

  useEffect(() => {
    if (!token || !userId ) {
      history.push('/');
    }

    // eslint-disable-next-line
  }, [ token, userId ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        {Object.keys(selectedArtists).length >= 5
          && <button onClick={() => postData(userId, selectedArtists)}>Next</button>}
      </Navbar>
      <Route exact path={`/users/${userId}/favorites`}>
        <FavoriteArtists
          userId={userId}
          loading={loading}
          artistList={artistList}
          selectedArtists={selectedArtists}
          postResult={postResult}
          requestData={requestData}
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
  requestData: getArtists(dispatch),
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
  requestData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  postData: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
