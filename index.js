require('dotenv').config()
const mongoose = require('./src/db/mongoose')
const express = require('express');
const userRouter = require('./src/routers/user')
const transactionRouter = require('./src/routers/transaction');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express()

const PORT = process.env.PORT || 5000

const multer = require('multer');
const upload = multer({
    dest : 'images'
});
app.post('/upload',upload.single('upload'), (req,res)=>{
    res.send()
})

app.use(express.json());  
app.use(cors({
    origin : 'http://localhost:3000', 
    credentials : true
}));
app.use(cookieParser());
app.use(transactionRouter)
app.use(userRouter)                 


app.listen(PORT, ()=> {
    console.log(`Listen on ${PORT}`);
})

