import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchArtists } from '../actions/artist.actions';
import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';
import FavoriteArtists from '../components/users/FavoriteArtists';

const UserContainer = ({ userId, artistList, requestData }) => {
  return (
    <Fragment>
      <Navbar logo={logo} />
      <Switch>
        <Route exact path={`/users/${userId}/favorites`}>
          <FavoriteArtists
            userId={userId}
            artistList={artistList}
            requestData={requestData}
          />
        </Route>
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  artistList: state.artist.artistList
});

const mapDispatchToProps = dispatch => ({
  requestData: fetchArtists(dispatch)
});

UserContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  artistList: PropTypes.array.isRequired,
  requestData: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
