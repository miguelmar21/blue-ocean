const ExampleSchema = require("./");

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const endpoint = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@spaghetti-cluster.p5ovz.mongodb.net/myFirstDatabase`;


mongoose.connect('mongodb://localhost:27017/testdb'); //connect to local
// mongoose.connect(endpoint); //connect to remote
const db = mongoose.connection;

db.once('open', (success) => {
  console.log('connected!', success)

});

module.exports = db;
