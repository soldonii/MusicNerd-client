import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  isLoggedIn,
  ...props
}) => (
  <Route
    {...props}
    render={props => isLoggedIn ? <Component {...props} /> : <Redirect to='/auth/login' />}
  />
);

export default ProtectedRoute;
