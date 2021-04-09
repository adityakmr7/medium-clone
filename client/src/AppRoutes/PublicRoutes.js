import React from "react";
import { Redirect, Route } from "react-router-dom";

import { checkAuth } from "../utils/checkAuth";

const PublicRouts = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
};

export default PublicRouts;
