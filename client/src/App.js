import React, {useState} from "react";
import './App.css';
import Axios from 'axios';
import {useHistory, withRouter} from "react-router-dom";

const loginOrSignUp = () => {
  alert('button clicked')
  console.log('[App.js: 11] fired!')
  Axios.post('https:/localhost:5000/api/login')
};


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <div className="App">
      <h1>Congo</h1>
      <h2>Login or sign up</h2>
      <div className="form">
        <label>Email:</label>
        <input 
          type="text" 
          name="email" 
          onChange={(e) => {setEmail(e.target.value);}}
        ></input>
        <label>Password:</label>
        <input 
          type="text" 
          name="password"
          onChange = {(e) => {setPassword(e.target.value);}}
        ></input>
        <button onClick={loginOrSignUp}>Submit</button>
        <button onClick={history.push('items')}>Submit2</button>
        <button>Sign Up</button>
      </div>

    </div>
  );
}

export default App;
