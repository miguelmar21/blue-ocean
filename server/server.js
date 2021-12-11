
//environment
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, "./config.env") });

//server
const express = require('express');
const { urlencoded } = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

// import your routes below here
const exampleMap = require('./routes/exampleRoute/exampleMapRoute');
const updateUser = require('./routes/profiles/updateUser.js');

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

// mongo connection
const mongoose = require('mongoose');
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

//USE REMOTE DATABASE
const remoteUrl = process.env.MONGO_URI;
const connect = mongoose.connect(remoteUrl, config);

//USE LOCAL DATABASE
//const localUrl = 'mongodb://127.0.0.1:27017/blueOcean';
//const connect = mongoose.connect(localUrl, config);

connect
  .then(db => console.log('connected to DB'))
  .catch(err => console.error(err));

// use imported routes here
app.use('/exampleSchema', exampleMap);
app.use('/updateUser', updateUser);

// listening
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));