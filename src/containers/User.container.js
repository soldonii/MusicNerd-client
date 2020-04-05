import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchArtists, selectArtist, deselectArtist, saveFavoriteArtists } from '../actions/artist.actions';
import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';
import FavoriteArtists from '../components/users/FavoriteArtists';

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
  const selectedLength = Object.keys(selectedArtists).length;

  return (
    <Fragment>
      <Navbar logo={logo}>
        {selectedLength >= 5 && <Link to='#' onClick={() => postData(userId, selectedArtists)}>Next</Link>}
      </Navbar>
      <Switch>
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
      </Switch>
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
  requestData: fetchArtists(dispatch),
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
