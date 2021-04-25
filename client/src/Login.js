import React, {useState} from "react";
//import './App.css';
import axios from 'axios';
import {Link, useHistory, withRouter} from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('')
    const history = useHistory();

    const handleLogin = () => {
      console.log('email = ', email)
      if(email == "admin")
      {
        //TODO(asoelter): make an admin page and send them there
        history.push('.admin')
      }

      axios.post('http://localhost:5000/is_current_user', {email: email})
        .then(res => {
          const isUser = res.data.isUser

          if(isUser)
          {
            history.push('.consumer')
          }
        })
        .catch(err => {console.log('returning from is_current_user with error: ', err)})
    }

  return (
    <div className="App">
      <h1>Congo</h1>
      <h2>This is the new login page</h2>
      <div className="form">
        <label>Email:</label>
        <input 
          type="text" 
          name="email" 
          onChange={event => setEmail(event.target.value)}
        ></input>
        <label>Password:</label>
        <input 
          type="text" 
          name="password"
        ></input>
        <button onClick={handleLogin}>Sign Up</button>
        <Link to="signUp">
            <li>Sign up</li>
        </Link>
      </div>

    </div>
  );
}

export default Login;
