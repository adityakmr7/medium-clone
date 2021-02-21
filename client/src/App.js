import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Main from "./container/Main";
import Login from "./pages/AuthPage/Login";
import Register from "./pages/AuthPage/Register";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <Main>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact  component={Register}/>
      </Switch>
    </Main>
  );
}

export default App;
