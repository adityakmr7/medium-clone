import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkAuth } from "../utils/checkAuth";

const PrivateRouts = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRouts;
