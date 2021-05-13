import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";

export const Favorites = (props) => {

    const email = props.location.state.email
    const [userName, setUserName] = useState('')
    const [productName, setProductName] = useState('')

    axios.post('http://localhost:5000/favorites', {email: email})
        .then(res => {console.log('returning from favorites route without error. Result: ', res.data.productName); setProductName(res.data.productName)})
        .catch(err => {console.log('returning from favorites route with error. Result: ', err)})

    axios.post('http://localhost:5000/user_name', {email: email})
        .then(res => {console.log('returning from user_name route without error. Result: ', res.data.productName); setUserName(res.data.userName)})
        .catch(err => {console.log('returning from user_name route with error. Result: ', err)})

  return (
    <div className="Favorites">
      <h1>This is the Favorites page</h1>
      <li>{userName}'s favorite order: {productName}</li>
    </div>
  );
}

export default Favorites;
