import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRouts = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        Cookies.get('access_token') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRouts;
