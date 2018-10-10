import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../utils/auth';

const PrivateRoute = ({ component: Component, isAuthorized, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        auth.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )} />
  )
}

export default PrivateRoute;