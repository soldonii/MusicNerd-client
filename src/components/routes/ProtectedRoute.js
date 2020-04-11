import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...props }) => {
  return (
    <Route
      {...props}
      render={props => (
        isLoggedIn ?
          <Component {...props} /> :
          <Redirect to='/login' />
      )}
    />
  )
};

export default ProtectedRoute;
