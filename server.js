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
app.get("/api/users", handler.get_allUsers);
//app.get("/api/users/:_id/logs", handler.get_singleUser);

// POST : ADD EXERCISE : api/users/:_id/exercises
  // PAYLOAD : description, duration ?date (if null currentDate)
  // POST RETURN : { EXERCISE DATA }
app.post("/api/users/:_id/exercises", handler.post_newExercise);

// GET : RETURN EXERCISEs OF USER : api/users/:_id/logs
app.get("/api/users/:id/logs", handler.get_UserExercises);