import React from "react";
import { Route, Redirect } from "react-router-dom";

const protectedRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default protectedRoute;
