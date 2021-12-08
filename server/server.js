
//environment
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, "./config.env") });

//server
const express = require('express');
const { urlencoded } = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;//deployment

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

// mongo connection
const mongoose = require('mongoose');

const url = process.env.MONGO_URI;//deployment
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
// const connect = mongoose.connect(url, config);//deployment

const localUrl = 'mongodb://localhost:27017/blueOcean';
// testing
const connect = mongoose.connect(localUrl);

connect
  .then(db => console.log('connected to DB'))
  .catch(err => console.error(err));


//routes
// import your routes below here

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));