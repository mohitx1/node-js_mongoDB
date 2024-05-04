const express = require('express');
const router = express.Router();
const person = require('../models/person');


router.post('/', async (req, res) => {
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

router.get('/',async(req,res) => {
    try {
        const data = await menuItems.find();
        console.log('Data fetched succefully');
        res.status(200).json(data)
    } catch (error){
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
});

module.exports = router;