const express = require('express');
const app = express();
const dotenv = require('dotenv');

//database connection
const db_connection = require('./db')
db_connection()

// get config vars
dotenv.config();
const port=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send(`Welcome to my hotel... How can ihelp you?`)
});

app.get('/chicken',(req,res)=>{
    res.send(`Love to serve you chicken`)
});

app.get('/idli',(req,res)=>{
    let idli ={
        name: 'idli',
        size: '10cm diameter',
        id_chutney: true
    }
    res.send(idli)
});

app.post('/items',(req,res)=>{
    console.log('posted')
    res.send('posted data')
})


app.listen(port,()=>{
    console.log(`Server running on Port ${port}`)
});