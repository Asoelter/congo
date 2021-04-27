import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";

export const History = (props) => {

  const email = props.location.state.email
  const [historyInfo, setHistoryInfo] = useState()

  axios.post('http://localhost:5000/user_history', {email: email})
    .then(res => {console.log('returned from user history without error. Res: ', res); setHistoryInfo(res.data.historyInfo)})
    .catch(err => {console.log('returned from user history with error: ', err)})

    let list;
    if(historyInfo!= undefined)
    {
        list = historyInfo.map((v) => 
            <div>
                <ul>
                <li key={v.product_name}>{v.product_name}</li>
                </ul>
            </div>
        )
    }

  return (
    <div className="History">
      <h1>This is the History page</h1>
      <div>
        {list}
      </div>
    </div>
  );
}

export default History;
