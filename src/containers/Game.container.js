import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { requestMakeGame } from '../actions/game.actions';

import Navbar from '../components/layout/Navbar';
import Main from '../components/layout/Main';
import WatingRoom from '../components/game/WatingRoom';
import logo from '../assets/logo.png';

const GameContainer = ({ userId, requestMakeGame }) => {
  return (
      <Fragment>
        <Navbar logo={logo}>
          <Link to='/users/:userId/profile'>Profile</Link>
          <Link to='/'>Logout</Link>
        </Navbar>
        <Switch>
          <Route exact path='/games'>
            <Main>
              <WatingRoom
                userId={userId}
                requestMakeGame={requestMakeGame}
              />
            </Main>
          </Route>
        </Switch>
      </Fragment>
  )
};

const mapStateToProps = state => ({
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  requestMakeGame: requestMakeGame(dispatch)
});

GameContainer.propTypes = {
  requestMakeGame: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
