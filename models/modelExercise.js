const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
	userid: {type: String, required: true},
	description: {type: String, required: true},
	duration: {type:Number, required: true},
	date: {type: Date, required: true}
});

module.exports = mongoose.model('exerciseRecord', exerciseSchema);