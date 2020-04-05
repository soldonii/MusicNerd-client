import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchArtists, selectArtist, deselectArtist } from '../actions/artist.actions';
import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';
import FavoriteArtists from '../components/users/FavoriteArtists';

const UserContainer = ({
  userId,
  artistList,
  selectedArtists,
  requestData,
  onSelect,
  onDeselect
}) => {
  return (
    <Fragment>
      <Navbar logo={logo} />
      <Switch>
        <Route exact path={`/users/${userId}/favorites`}>
          <FavoriteArtists
            userId={userId}
            artistList={artistList}
            selectedArtists={selectedArtists}
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
  artistList: state.artist.artistList,
  selectedArtists: state.artist.selectedArtists
});

const mapDispatchToProps = dispatch => ({
  requestData: fetchArtists(dispatch),
  onSelect: selectArtist(dispatch),
  onDeselect: deselectArtist(dispatch)
});

UserContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  artistList: PropTypes.array.isRequired,
  selectedArtists: PropTypes.object.isRequired,
  requestData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
