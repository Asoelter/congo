import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";

export const Consumer = () => {

    const history = useHistory();



    return (
        <div className="SignUp">
            <button style={{width: '8%', float: 'right'}} >Sign Out</button>
        <h1>This is the consumer page</h1>
        </div>
  );
}

export default Consumer;