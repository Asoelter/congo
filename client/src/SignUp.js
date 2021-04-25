import React, {useState} from "react";
import './SignUp.css';
import axios from 'axios';
import {useHistory} from "react-router-dom";

export const SignUp = () => {

    const history = useHistory();
    //TODO(asoelter): consider adding a password
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')

    const handleSignUp = () => {
        axios.post('http://localhost:5000/signUp', {name: name, email: email, phoneNumber: phoneNumber, address: address})
            .then(res => {console.log('returning from sign up route without error')})
            .catch(err => {console.log('returning from signUp route with error: ', err)})
        history.push('/')
    }


  return (
    <div className="SignUp">
      <h1>This is the sign up page</h1>
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          name="email" 
          onChange={event => setName(event.target.value)}
        ></input>
    </div>
    <div>
        <label>Email:</label>
        <input 
          type="text" 
          name="password"
          onChange={event => setEmail(event.target.value)}
        ></input>
    </div>
    <div>
        <label>Phone Number:</label>
        <input 
          type="text" 
          name="password"
          onChange={event => setPhoneNumber(event.target.value)}
        ></input>
    </div>
    <div>
        <label>Address:</label>
        <input 
          type="text" 
          name="password"
          onChange={event => setAddress(event.target.value)}
        ></input>
    </div>
    <div>
        <button onClick={handleSignUp}>Sign Up</button>
    </div>
    </div>
  );
}

export default SignUp;
