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
const menuItems = require('./models/menu')


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

app.get('/person',async(req,res) => {
    try {
        const data = await person.find();
        console.log('Data fetched succefully');
        res.status(200).json(data)
    } catch (error){
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
})


app.post('/menu', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data

        const newMenuItems = new menuItems(data);
        
        const savedItems = await newMenuItems.save();

        console.log('Data saved successfully');
        res.status(200).json({ savedItems });
    } catch (error) {
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/menu',async(req,res) => {
    try {
        const data = await menuItems.find();
        console.log('Data fetched succefully');
        res.status(200).json(data)
    } catch (error){
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
});

app.get('/person/:workType', async(req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){

            const response = await person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            console.log('Invalid work type')
            res.status(404).json({ error : 'Invalid work type'});
        }
    }catch(error){
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
})


app.listen(port,()=>{
    console.log(`Server running on Port ${port}`)
});