require('dotenv').config();
const mongoose = require('mongoose');

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const endpoint = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@spaghetti-cluster.p5ovz.mongodb.net/myFirstDatabase`;

mongoose.connect(endpoint);
const db = mongoose.connection;

db.once('open', () => {
  console.log('connected!')
});

module.exports = db;