import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from 'js-cookie';

const PublicRouts = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
       !Cookies.get('access_token')? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
};

export default PublicRouts;