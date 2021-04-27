import React from "react";
import './App.css';
import Admin from './Admin.js'
import Consumer from './Consumer.js'
import Favorites from './Favorites.js'
import History from './History.js'
import Login from './Login.js'
import SignUp from './SignUp.js'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {

  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path = "/" component={Login} />
        <Route exact path = "/admin" component={Admin} />
        <Route exact path = "/consumer" component={Consumer} />
        <Route exact path = "/favorites" component={Favorites} />
        <Route exact path = "/history" component={History} />
        <Route exact path = "/signUp" component={SignUp} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
