const express = require('express');
const router = express.Router();
const menuItems = require('../models/menu');


router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the menu data

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

router.get('/:taste', async(req,res)=>{
    try{
        const tasteType = req.params.taste;
        if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy'){

            const response = await menuItems.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            console.log('Invalid taste type')
            res.status(404).json({ error : 'Invalid taste type'});
        }
    }catch(error){
        console.error('Error saving menuItems:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
});

module.exports = router;