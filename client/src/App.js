import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Main from "./container/Main";
import Login from "./pages/AuthPage/Login";
import Register from "./pages/AuthPage/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/HomePage/HomePage";
import PublicRoute from './AppRoutes/PublicRoutes';
import PrivateRoute from './AppRoutes/PrivateRoutes';
import PostDetail from "./pages/Dashboard/PostDetail";


function App() {
  return (
    <Main>
      <Navigation/>
      <Switch>
        <PublicRoute path="/" exact component={HomePage} />
        <PublicRoute path="/login" exact component={Login}/>
        <PublicRoute path="/register" exact  component={Register}/>
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/dashboard/:id" exact component={PostDetail}/>
      </Switch>
    </Main>
  );
}

export default App;
