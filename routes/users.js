const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');

router.route('/').get( async (req, res) => {
	try{
		const users = await User.find();
		res.json(users);
	} catch(err) {
		res.status(400).json('Error: ' + err);
	}
	/* User.find()
		.then(users =>  res.json(users))
		.catch(err => res.statusCode(400).json('Error: ' + err)); */
});

router.route('/add').post( async (req,res) => {
	const username = req.body.username;
	const phone = Number(req.body.phone);
	const lat = req.body.lat;
	const long = req.body.long;
	const country = req.body.country;
	const pincode = req.body.pincode;
	const district = req.body.district;

	const salt = await bcrypt.genSalt(10);
	const original = req.body.password;
	const password = await bcrypt.hash(original, salt);

	const date = Date.parse(req.body.date);
	console.log(req.body);
	const newUser = new User({
		username,
		phone,
		password,
		lat,
		long,
		country,
		pincode,
		district,
		date,
	});

	try{
		const savedUser = await newUser.save();
		res.json({savedUser});
	}catch(err){
		res.status(400).json('Error: ' + err);
	}
	/* newUser.save()
		.then(() => res.json('User added!'))
		.catch(err => res.statusCode(400).json('Error: ' + err)); */

	router.route('/:id').get( async (req, res) => {
		try{
			const user = await User.findById(req.params.id);
			res.json(user);
		} catch(err) {
			res.status(400).json('Error: ' + err);
		}
		
			/*
			User.findById(req.params.id) 
			.then(user => res.json(user))
			.catch(err => res.status(400).json('Error: ' + err)); */
	});
});

router.route('/update/:id').post( async (req, res) => {
	try{
		const user = await User.findById(req.params.id);
		user.username = req.body.username;
		user.date = Date.parse(req.body.date);

		const salt = await bcrypt.genSalt(10);
		const original = req.body.password;
		const password = await bcrypt.hash(original, salt);
		user.password = password;

		const savedUser = await user.save();
		res.json({savedUser});
	} catch(err) {
		res.status(400).json('Error: ' + err);
	}	
	/* User.findById(req.params.id)
	  .then(user => {
		user.username = req.body.username;
		user.date = Date.parse(req.body.date);
		userphone = Number(req.body.phone);
		user.password = req.body.password;

		user.save()
		  .then(() => res.json('User updated!'))
		  .catch(err => res.status(400).json('Error: ' + err));
	  })
	  .catch(err => res.status(400).json('Error: ' + err)); */
  });

router.route('/auth').post( async (req,res) => {
	try{
		console.log(req.body.phone);
		const phone = req.body.phone;
		const pass = req.body.password;
		const user = await User.findOne({"phone": req.body.phone});
		const dbpass = user.password
		const passValid = await bcrypt.compare(pass, dbpass);
		if(passValid){
			res.json({"valid": true, "user":user});
		}else{
			res.json({"old": pass, "new" : dbpass});
		}
	} catch(err){
		res.status(400).json('Error: ' + err);
	}
});

module.exports = router;