const userRecord = require("../models/modelUserExercise.js");

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
	}
}

const get_userDetails = () => {}

exports.post_newUser = post_newUser;