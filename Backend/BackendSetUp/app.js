const express = require('express')//API
const cors = require('cors')//Different address DAta sharing
const mongoose = require('mongoose')//backend - database
const bcrypt = require('bcrypt')//Hash the sensitive data

const app = express()
//middle layer
app.use(cors())//enable
app.use(express.json())

//1.Backend database connection

//mongoose.connect('Database address')

mongoose.connect('mongodb://localhost:27017/JuneUserAuth')

.then(()=> console.log("MongoDB connected"))

.catch((err)=>console.log(err))

//B.Schema - it is a blueprint of data where you want to store database

const userSchema = new mongoose.Schema({
    //key value pair
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String
})

//c.collection - model

const user = mongoose.model('User',UserSchema)

//API - Route frontend - Backend app.methodname

app.get('/',(req,res)=>{
    res.send('API running')
})
//Register
app.post('/register',async(req,res)=>{
    
})