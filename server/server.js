//environment
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./config.env") });

//server
const express = require("express");
const { urlencoded } = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const authenticate = require('./routes/authRoutes/authHandlers/auth');
const serverSignature = require('./routes/authRoutes/authHandlers/serverSignature');
const session = require('express-session');
const fileStore = require('session-file-store')(session);

// import your routes below here
const performersNearby = require("./routes/performersNearby/performersRoute.js");
const exampleMap = require('./routes/exampleRoute/exampleMapRoute');

// Profile Routes
const updateUser = require('./routes/profiles/updateUser.js');
const getUser = require('./routes/profiles/getUser.js');
const performances = require('./routes/performances/performances');
const getFavorites = require('./routes/profiles/getFavorites.js');

// Auth routes
const errorHandler = require('./routes/authRoutes/authHandlers/errorHandler');
const auth = require("./routes/authRoutes/authHandlers/authFilter");
const signout = require('./routes/authRoutes/signout');
const login = require('./routes/authRoutes/login');
const signup = require('./routes/authRoutes/signup')


// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(session({
  name: 'session_id',
  secret: serverSignature,
  saveUninitialized: false,
  resave: false,
  store: new fileStore()
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../dist')));

// mongo connection
const mongoose = require('mongoose');

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//USE REMOTE DATABASE
// const remoteUrl = process.env.MONGO_URI;
// const connect = mongoose.connect(remoteUrl, config);

//USE LOCAL DATABASE
const localUrl = 'mongodb://127.0.0.1:27017/blueOcean';
const connect = mongoose.connect(localUrl, config);

connect
  .then(db => console.log('connected to DB'))
  .catch(err => console.error(err));


//routes
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/exampleSchema', exampleMap);
app.use('/login', login);
app.use('/signup', signup);
app.use('/signout', signout);
app.use('/getUser', getUser);
app.use('/getFavorites', getFavorites);
app.use('/updatePerformances', performances);
// app.use(auth);
app.use('/updateUser', updateUser);
// app.use(errorHandler);
// listening
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));