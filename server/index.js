const express = require('express')
const app = express()
const router = express.Router()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const db = mysql.createPool({
    host: 'congo-db.ckbkr0exorlq.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'password',
    database: 'congo'
});

app.use(cors())

app.get('/', (req, res) => {
    res.send('hello world')
    const command = "SELECT * FROM consumers"
    db.query(command, (err, result) => {
        if(err)
        {
            console.log('err: ', err)
        }
        else
        {
            console.log('result: ', result)
        }
    })
})

app.post('/signUp', (req, res) => {
    console.log('sign up route visited with request = ', req.body)
    res.send("received")
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