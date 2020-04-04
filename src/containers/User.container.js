import React, { useState, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';
import FavoriteArtists from '../components/users/FavoriteArtists';

const UserContainer = ({ userId }) => {
  return (
    <Fragment>
      <Navbar logo={logo} />
      <Switch>
        <Route exact path={`/users/${userId}/favorites`}>
          <FavoriteArtists userId={userId} />
        </Route>
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId
});

export default connect(mapStateToProps, null)(UserContainer);
