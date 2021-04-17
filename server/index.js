const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Whitetoad2*',
    database: 'congo'
});

app.use(cors())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post("api/login", (req, res) => {
    console.log('called route')
    const command = "INSERT INTO consumers ('billing_address', 'shipping_address', phonen_number', 'email') VALUES ('second_address', 'second_address', '123-456', 'test@test.com');"
    db.query(command, (err, result) => {
        console.log('adding a value!')
    });
})

app.listen(5000, ()=> {
    console.log('running on port 5000')
})