import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Main from "./container/Main";
import Login from "./pages/AuthPage/Login";
import Register from "./pages/AuthPage/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Main>
      <Navigation/>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact  component={Register}/>
        <Route path="/dashboard" exact component={Dashboard}/>
      </Switch>
    </Main>
  );
}

export default App;
