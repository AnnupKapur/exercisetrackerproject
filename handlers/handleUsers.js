const userRecord = require("../models/modelUser.js");
const exerciseRecord = require("../models/modelExercise.js");

// ------------------------
// POST : NEW USER
// ------------------------
const post_newUser = (req, res) => {
	if(req.body.username.length===0){
		return res.json({"error" : "You must enter a username"})
	} else {
		let newUser = new userRecord({
			"username": req.body.username
		})
		newUser.save((err, data)=>{
			if(err){return console.log(`Error: ${err}`)}
			return res.json(data);
		});
	};
};

const get_allUsers = (req, res) => {
	userRecord.find().exec((err, data) => {
		if(err) return console.log(`Error: ${err}`);
		if(data.length>0){res.json(data)}
		else{
			res.json('nothing to return');
		};
	});
};

const get_singleUser = (req, res) => {
	const userIDsearch = req.params._id;
}

const post_newExercise = (req, res) => {
	userRecord.findOne({"_id": req.params["_id"]}, (err,data) => {
		if(err){ return console.log(`Error: ${err}`)};

		if(data){
			if(!req.body.description){return res.json('Description is required')}
			if(!req.body.duration){return res.json("Duration is required")}
			
			let date = req.body.date;

			if(!req.body.date){date = new Date();}

			let newExercise = new exerciseRecord({
				"userid":req.params["_id"],
				"description": req.body.description,
				"duration": parseInt(req.body.duration),
				"date" : date,
			})

			let userData = data;

			newExercise.save((err, data) => {
            if (err) { return console.log(`There has been an errorError: ${err}`) }
				return res.json({
					userData,
					data,
				})
			})
		} else{
			return res.json('That user does not exist');
		}
	})
}

exports.post_newUser = post_newUser;
exports.get_allUsers = get_allUsers;
exports.post_newExercise = post_newExercise;