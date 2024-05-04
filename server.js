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

//import models
const person = require('./models/person');

app.get('/',(req,res)=>{
    res.send(`Welcome to my hotel... How can ihelp you?`)
});

// app.post('/person', (req, res) => {
//     const data = req.body; // Assuming the request body contains the person data

//     const newPerson = new person(data);

//     newPerson.save()
//         .then(savedPerson => {
//             console.log('Data saved successfully');
//             res.status(200).json({ savedPerson });
//         })
//         .catch(error => {
//             console.error('Error saving person:', error);
//             res.status(500).json({ error: 'Internal server error' });
//         });
// });

app.post('/person', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data

        const newPerson = new person(data);
        
        const savedPerson = await newPerson.save();

        console.log('Data saved successfully');
        res.status(200).json({ savedPerson });
    } catch (error) {
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port,()=>{
    console.log(`Server running on Port ${port}`)
});