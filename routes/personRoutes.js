const express = require('express');
const router = express.Router();
const person = require('../models/person');

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

router.post('/', async (req, res) => {
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

router.get('/',async(req,res) => {
    try {
        const data = await person.find();
        console.log('Data fetched succefully');
        res.status(200).json(data)
    } catch (error){
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
})

router.get('/:workType', async(req,res)=>{
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
});

module.exports = router;