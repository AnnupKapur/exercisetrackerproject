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

// ------------------------
// GET : ALL USERS
// ------------------------
const get_allUsers = (req, res) => {
	userRecord.find().exec((err, data) => {
		if(err) return console.log(`Error: ${err}`);
		if(data.length>0){res.json(data)}
		else{
			res.json('nothing to return');
		};
	});
};

// ------------------------
// POST : NEW EXERCISE
// ------------------------
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

// -----------------------------
// GET : USER EXERCISE LIST
// -----------------------------
const get_UserExercises = (req, res) => {
	const strUserID = req.params["id"];
	let dateFrom;
	let dateTo;

	if(req.query.from){
		dateFrom = new Date(req.query.from);
		if(dateFrom === "Invalid Date"){
			return res.json("Invalid FROM Date");
		};
	};

	if(req.query.to){
		dateTo = new Date(req.query.to);
		if(dateTo === "Invalid Date"){
			return res.json("Invalid TO Date");
		};
	};

	if(req.query.limit){
		const intLimit = parseInt(req.query.limit);
		if(isNaN(intLimit)){
			return res.json("Invalid Limit Entered");
		};
	};
	console.log(strUserID);
	userRecord.findOne({"_id": strUserID}, (err, data) => {
		if(err){ return console.log(`Error: ${err}`)};

		if(!data){
			return res.json("Invalid User ID");
		} else{
			const objReturnData = {"_id" : strUserID, "username" : data.username};
			const objDateFilter = {};
			const objUserFilter = {"userid": strUserID};

			if(dateFrom){
				objReturnData["from"] = dateFrom.toDateString();
				objDateFilter["$gte"] = dateFrom;
				if(dateTo){
					objReturnData["to"] = dateTo.toDateString();
					objDateFilter["$lt"] = dateTo;
				} else{
					objDateFilter["$lt"] = Date.now();
				};
			};

			if(dateTo && !dateFrom){
				objDateFilter["$gte"] = new Date("1970-01-01");
				objReturnData["to"] = dateTo.toDateString();
				objDateFilter["$lt"] = dateTo;
			};

			if(dateFrom || dateTo){
				objUserFilter.date = objDateFilter;
			};

			exerciseRecord.count(objUserFilter, (err, data) => {
				if(err) { return res.json(`the error is : ${err}`)};

				if(data){
					objReturnData.count = data;
				} else {
					objReturnData.count = 0;
				}
			});

			exerciseRecord.find(objUserFilter, (err, data) => {
				if(err) { return res.json(`the error is : ${err}`)};

				if(data){
					let count = 0;
					let arrAllExercisesPrepared = [];
					const intLimit = parseInt(req.query.limit);

					data.forEach((objSingleExercise) => {
						count += 1;
						if(!intLimit || count<=intLimit){
							const objSingleExercisePrepared = {
								description: objSingleExercise.description,
								duration: objSingleExercise.duration,
								date: objSingleExercise.date.toDateString(),
							};
							
							arrAllExercisesPrepared.push(objSingleExercisePrepared);
						}
					})
					objReturnData["log"] = arrAllExercisesPrepared;
					return res.json(objReturnData);
				};
			});
		};
	});

};

exports.post_newUser = post_newUser;
exports.post_newExercise = post_newExercise;

exports.get_allUsers = get_allUsers;
exports.get_UserExercises = get_UserExercises;