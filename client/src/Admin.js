import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";

export const Admin = () => {

    const history = useHistory();
    const [productName, setProductName] = useState('')
    const [stock, setStock] = useState(0)

    const handleSignOut = () => {
        history.push('/')
    }

    const handleNewProduct = () => {
        axios.post('http://localhost:5000/add_new_product', {productName: productName, stock: stock})
            .then(res => {
                if(!res.data.success)
                {
                    alert('internal error: failed to add product to database')
                }
            })
            .catch(err => {console.log('adding new product to database caused error: ', err)})
    }

  return (
    <div className="SignUp">
        <button style={{width: '8%', float: 'right'}} onClick={handleSignOut}>Sign Out</button>
      <h1>This is the admin page</h1>
      <div>
          <div>
            <label>Add New Product:</label>
          </div>
        <label>Product Name:</label>
        <input 
            type="text" 
            name="product" 
            onChange = {event => setProductName(event.target.value)}
        ></input>
      </div>
      <div>
        <label>Stock:</label>
        <input 
          type="text" 
          name="product" 
          onChange = {event => setStock(event.target.value)}
        ></input>
    </div>
    <div>
        <button onClick = {handleNewProduct}>Submit</button>
    </div>
    </div>
  );
}

export default Admin;