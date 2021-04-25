import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";

export const Consumer = () => {

    const history = useHistory();
    const [productInfo, setProductInfo] = useState();

    axios.get('http://localhost:5000/product_info')
        .then(res => {setProductInfo(res.data)})
        .catch(err => {console.log('returned from product_info with error: ', err)})

    console.log('productInfo: ', productInfo)

    /*
    let list;
    if(productInfo != undefined)
    {
        list = productInfo.map((v) => <li key={v.p_name}>{v.p_name}</li>)
    }
    */

    let list = [1,23]

    return (
        <div className="SignUp">
            <button style={{width: '8%', float: 'right'}} >Sign Out</button>
            <h1>This is the consumer page</h1>
            <div>
                {list}
            </div>
        </div>
    );
}

export default Consumer;