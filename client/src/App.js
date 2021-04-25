import React, {useState} from "react";
import './App.css';
import Nav from './Nav.js'
import Login from './Login.js'
import SignUp from './SignUp.js'
import Axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {

  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path = "/" component={Login} />
        <Route exact path = "/signUp" component={SignUp} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
