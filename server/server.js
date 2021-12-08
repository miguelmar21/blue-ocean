require('dotenv').config()
var cors = require('cors');
var path = require('path');
const express = require("express");
const mongoose = require("mongoose");
//ATLAS FOR SHARED DB

const app = express();
app.use(express.static(__dirname + '/../dist/'));
const PORT = process.env.PORT || 3000;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

app.use(express.json());
app.use(cors());

var map = require('./map');
// var map = require('./profiles');

app.use('/map', map);

const endpoint = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@spaghetti-cluster.p5ovz.mongodb.net/myFirstDatabase`

mongoose.connect(endpoint)
const db = mongoose.connection

db.once('open', () => {
  console.log('connected!')
})





app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`)
});