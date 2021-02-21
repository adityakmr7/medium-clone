import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRouts = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        window.localStorage.getItem("access_token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRouts;
