import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";

export const Consumer = () => {

    const history = useHistory();
    const [productInfo, setProductInfo] = useState();
    const [purchaseQuantity, setPurchaseQuantity] = useState(0);

    const handlePurchase = (productName) => {
        console.log('product name: ', productName)
        alert('purchased: ' + productName)

        axios.post('http://localhost:5000/purchase', {productName: productName, purchaseQuantity: purchaseQuantity})
            .then(res => {console.log('returning from purchase route with no error')})
            .catch(err => {console.log('returning from purchase route with error', err)})
    }

    axios.get('http://localhost:5000/product_info')
        .then(res => {setProductInfo(res.data.productInfo)})
        .catch(err => {console.log('returned from product_info with error: ', err)})

    let list;
    if(productInfo != undefined)
    {
        list = productInfo.map((v) => 
            <div>
                <ul>
                <li key={v.p_name}>{v.p_name + ': ' + v.stock}</li>
                <label>Quantity: </label>
                <input
                    type="text" 
                    name="email" 
                    onChange={event => setPurchaseQuantity(event.target.value)}
                >
                </input>
                <button onClick = {() => {handlePurchase(v.p_name)}}>Purchase</button>
                </ul>
            </div>
        )
    }

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