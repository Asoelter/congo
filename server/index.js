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
    const stock = req.body.stock

    const command = "INSERT INTO product (p_name, stock) VALUES (?, ?);"
    db.query(command, [productName, stock], (err, result) => {
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

app.get('/product_info', (req, res) => {
    const command = 'SELECT * FROM product;'
    db.query(command, (err, result) => {
        if(err)
        {
            console.log('requesting product info caused error: ', err)
        }

        //console.log('result: ', result)
        res.send({productInfo: result})
    })
})

app.post('/purchase', async (req, res) =>{
    const productName = req.body.productName
    const amountPurchased = req.body.purchaseQuantity
    const email = req.body.email
    console.log('amount purchased: ', amountPurchased)
    const command = 'SELECT stock FROM product WHERE p_name = ?'

    await db.query(command, [productName], (err, currentStockResponse) => {
        if(err)
        {
            console.log('purchasing product caused error: ', err)
        }

        console.log('result of querying product stock: ', currentStockResponse)

        const updateCommand = 'UPDATE product SET stock = ? WHERE p_name = ?'
        console.log('current stock: ', currentStockResponse[0].stock)
        const newStock = currentStockResponse[0].stock - amountPurchased

        db.query(updateCommand, [newStock, productName], (err, result) => {
            if(err)
            {
                console.log('error updating quantity. Err: ', err)
            }
        })
    })

    const createOrderQuery = 'INSERT INTO congo.orders (date_placed, email, quantity, product_name) VALUES(?, ?, ?, ?)'
    const today = new Date()
    db.query(createOrderQuery, [today, email, amountPurchased, productName], (err, result) => {
        if(err)
        {
            console.log('failed to create new order. Err: ', err)
        }

        console.log('result after attempting to create a new order: ', result)
    })
    
    res.status(200).send()
})

app.post('/user_history', (req, res) =>{
    const email = req.body.email
    //const query = 'Select (c_name, product_name, quantity, date_placed) from orders join consumers where orders.email = ?'
    const query = 'Select distinct (product_name) from orders inner join consumers where orders.email = ?'

    db.query(query, [email], (err, result) => {
        if(err)
        {
            console.log('could not complete user_history query. Err: ', err)
        }

        console.log('result from user history query: ', result)

        res.send({historyInfo: result})
    })
})

app.post('/favorites', (req, res) => {
    const email = req.body.email

    const query = 'Select product_name from product join orders on orders.product_name = product.p_name where quantity >= all (select quantity from orders) and orders.email = ?'
    db.query(query, [email], (err, result) => {
        if(err)
        {
            console.log('could not complete favorites query. Err: ', err)
        }

        console.log('result from user favorites query: ', result)
        res.send({productName: result})
    })
})

app.listen(5000, ()=> {
    console.log('running on port 5000')
})