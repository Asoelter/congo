import React, {useState} from "react";
//import './App.css';
import Axios from 'axios';
import {Link, useHistory, withRouter} from "react-router-dom";

function Login() {
  return (
    <div className="App">
      <h1>Congo</h1>
      <h2>This is the new login page</h2>
      <div className="form">
        <label>Email:</label>
        <input 
          type="text" 
          name="email" 
        ></input>
        <label>Password:</label>
        <input 
          type="text" 
          name="password"
        ></input>
        <button >Sign Up</button>
        <Link to="signUp">
            <li>Sign up</li>
        </Link>
      </div>

    </div>
  );
}

export default Login;
