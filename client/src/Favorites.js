import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";

export const Favorites = (props) => {

    const email = props.location.state.email

    axios.post('http://localhost:5000/favorites', {email: email})
        .then(res => {console.log('returning from favorites route without error. Result: ', res)})
        .catch(err => {console.log('returning from favorites route with error. Result: ', err)})


  return (
    <div className="Favorites">
      <h1>This is the Favorites page</h1>
    </div>
  );
}

export default Favorites;
