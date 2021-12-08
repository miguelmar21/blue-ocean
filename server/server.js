
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


// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));


// mongo connection
const mongoose = require('mongoose');

const remoteUrl = process.env.MONGO_URI;//deployment
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

//comment out to use local mongo db
const connect = mongoose.connect(remoteUrl, config);

// const localUrl = 'mongodb://127.0.0.1:27017/blueOcean'; //comment out to use remote database
// testing
// const connect = mongoose.connect(localUrl, config);//comment out to use remote database

connect
  .then(db => console.log('connected to DB'))
  .catch(err => console.error(err));


//routes

// use imported routes here

// example route
app.use('/exampleSchema', exampleMap);


// listening
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));