
//environment
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, "./config.env") });


//server
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const serverSignature = require('./routes/authRoutes/authHandlers/serverSignature');
const errorHandler = require('./routes/authRoutes/authHandlers/errorHandler');
const session = require('express-session');
const fileStore = require('session-file-store')(session);//will stores sessions in a file
const port = process.env.PORT || 3000;

// mongo connection
const mongoose = require('mongoose');

// const remoteUrl = process.env.MONGO_URI;//deployment
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

//comment out to use local mongo db
// const connect = mongoose.connect(remoteUrl, config);

const localUrl = 'mongodb://127.0.0.1:27017/blueOcean'; //comment out to use remote database
// testing
const connect = mongoose.connect(localUrl, config);//comment out to use remote database

connect
  .then(db => console.log('connected to DB'))
  .catch(err => console.error(err));


// import your routes below here
const exampleMap = require('./routes/exampleRoute/exampleMapRoute');
const auth = require("./routes/authRoutes/authHandlers/auth");
const signout = require('./routes/authRoutes/signout');
const login = require('./routes/authRoutes/login');
const signup = require('./routes/authRoutes/signup')


// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  name: 'session_id',
  secret: serverSignature,
  saveUninitialized: false,
  resave: false,
  store: new fileStore()
}));

// auth paths
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/login', login);
app.use('/signup', signup);
app.use(auth);

//routes
// use imported routes here

// example route
app.use('/exampleSchema', exampleMap);
app.use('/signout', signout);
app.use(errorHandler);


// listening
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));