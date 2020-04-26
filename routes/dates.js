const router = require('express').Router();
let Dates = require('../models/dates.model');

router.route('/add').post( async (req, res) =>{
    const username = req.body.username;
    const id = req.body.id;
    const bool = req.body.bool;
    const date = req.body.datee;

    const newDates = new Dates({
        username,
        id,
        bool,
        date,
    });

    try{
		const savedDate = await newDates.save();
		res.json({savedDate});
	}catch(err){
		res.status(400).json('Error: ' + err);
	}
});

router.route('/update').post( async (req, res) =>{
    try{
        const filter = {"id": req.body.id, "date": req.body.datee};
        const update = {"bool": req.body.bool};
        const dates = await Dates.findOneAndUpdate(filter, update,{
            new: true
        });
        res.json({dates});
    }catch(err){
        res.status(400).json('Error: ' + err);
    }
});

router.route('/:id').get( async (req, res) => {
    try{
        const datess = await Dates.find({"id": req.params.id});
        res.json(datess);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
    
        /*
        User.findById(req.params.id) 
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err)); */
});

module.exports = router;