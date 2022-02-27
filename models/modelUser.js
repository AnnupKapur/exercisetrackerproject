const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {type: String, required: true}
});

const exerciseSchema = new mongoose.Schema({
	id: {type: String, required: true},
	description: {type: String, required: true},
	duration: {type:Number, required: true},
	date: {type: Date, required: true}
});

module.exports = mongoose.model('userRecord', userSchema);