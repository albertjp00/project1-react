const express = require('express')
const cookieParser = require('cookie-parser')

const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const path= require('path')

const app = express()

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Database Connected'))
.catch((err) =>console.log('Database not coneected',err)
)

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : false}))

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));


// app.use('/images', express.static('images'));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/',require('./Routes/authRoute'))


const port = 5000
app.listen(port,()=> console.log("Server Running"))