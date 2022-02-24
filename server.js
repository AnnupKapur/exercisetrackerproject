const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
var bodyParser = require("body-parser");
const mongo = require("mongodb");
const mongoose = require('mongoose');
const handler = require('./handlers/handleUsers.js');

mongoose.connect(process.env.MONGO_URI, {useMongoClient: true}, (err)=>{
  if(err) {return console.log(`Error: ${err}`)};
  console.log(`MongoDB Connection is: ${mongoose.connection.readyState}` );
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});

// POST : CREATE USER : RETURN USER ID : api/users/:USERID
app.post("/api/users", handler.post_newUser);

// GET : RETURN ARRAY LIST ALL USERS : api/users/
  // { USERNAME: USERNAME, USERID: ID}

// POST : ADD EXERCISE : api/users/:_id/exercises
  // PAYLOAD : description, duration ?date (if null currentDate)
  // POST RETURN : { EXERCISE DATA }

// GET : RETURN EXERCISE OF USER : api/users/:_id/logs

// GET : RETURN EXERCISES OF USER : api/users/:_id/logs
  // OPTIONAL PARAMS: [FROM, TO, LIMIT]