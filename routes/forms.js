const router = require('express').Router();
let Com = require('../models/form.model');

router.route('/').post( async (req, res) => {
	try {
		const coms = await Com.find({category: req.body.category});
		const S = coms.length;
		let sum=0;
		for(let i =0;i<S;i++){
			sum += Number(coms[i].index);
		}
		const average = sum/S;
		res.json({average});
	} catch(err) {
		res.statusCode(400).json('Error: ' + err);
	}

});



router.route('/add').post( async (req, res) => {
	const index = Number(req.body.index);
	const category = req.body.category;
	const country = req.body.country;
	const district = req.body.district;
	const pincode = req.body.pincode;
	const date = Date.parse(req.body.date);
	const newCom = new Com({
		index,
		category,
		country,
		district,
		pincode,
		date,
	});

	try {
		const savedCom = await newCom.save();
		res.json(`${category} added!`);
	} catch(err) {
		res.status(400).json('Error: ' + err);
	}

	/* newCom.save()
		   .then(() => res.json(`${category} added!`))
		   .catch(err => res.statusCode(400).json('Error: ' + err)); */
});


module.exports = router;