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

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cors(corsOptions))

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
    const name = req.body.name
    const email = req.body.email
    const phoneNumber = req.body.phoneNumber
    const address = req.body.address

    const command = "INSERT INTO consumers (c_name, email, phoneNumber, address) VALUES (?, ?, ?, ?);"
    db.query(command, [name, email, phoneNumber, address], (err, result) => {
        if(err)
        {
            console.log('insertion caused error: ', err)
        }
        console.log('result after insertion: ', result)
    });
    
    console.log('sign up route visited with request = ', req.body)
    console.log('sign up route visited with name = ', name)
    res.send("received")
})

app.post('/is_current_user', (req, res) => {
    const email = req.body.email
    const command = 'SELECT * FROM consumers WHERE email=?'
    db.query(command, [email], (err, result) => {
        if(err)
        {
            console.log('sign up caused error: ', err)
        }

        console.log('result after sign up: ', result)
        res.send({isUser: result.length != 0})
    });
})

app.post('/add_new_product', (req, res) => {
    const productName = req.body.productName
    const quantity = req.body.quantity

    const command = "INSERT INTO product (p_name, stock) VALUES (?, ?);"
    db.query(command, [productName, quantity], (err, result) => {
        success = true

        if(err)
        {
            console.log('add new product caused error: ', err)
            success = false
        }

        console.log('result after adding a new product: ', result)
        res.send({success: success})
    })
})

app.post("api/login", (req, res) => {
    console.log('called route')
    db.query(command, (err, result) => {
        console.log('adding a value!')
    });
})

app.listen(5000, ()=> {
    console.log('running on port 5000')
})