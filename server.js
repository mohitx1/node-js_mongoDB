const express = require('express');
const app = express();
const dotenv = require('dotenv');


//database connection
const db_connection = require('./db')
db_connection()

// get config vars
dotenv.config();
const port=process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());


// routes
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');



app.use('/person',personRoutes);
app.use('/menu',menuRoutes);




app.listen(port,()=>{
    console.log(`Server running on Port ${port}`)
});