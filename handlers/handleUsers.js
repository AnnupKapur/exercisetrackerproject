const userRecord = require("../models/modelUser.js");
const exerciseRecord = require("../models/modeExercise.js");

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

const post_newExercise = (req, res) => {
	userRecord.findOne({'username': req.params.id}, (err,data) => {
		if(err){ return console.log(`Error: ${err}`)};
		if(data){
			if(!req.body.description){return res.json('Description is required')}
			if(!req.body.duration){return res.json("Duration is required")}
			
			let date = req.body.date;

			if(!req.body.date){date = new Date();}

			let newExercise = new exerciseRecord({
				"id":req.params.id,
				"description": req.body.description,
				"duration": req.body.duration,

			})

s
		} else{
			return res.json('That user does not exist');
		}
	})
}

exports.post_newUser = post_newUser;
exports.get_allUsers = get_allUsers;