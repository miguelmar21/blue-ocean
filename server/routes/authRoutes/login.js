
const { UserSchema } = require('../../../database');
const route = require('express').Router();
const passport = require('passport');


// login possibilities
// user already loggedin: on front-end, display already logged in message
//user account doesnt exists: redirect to signup
// password invalid: keepon login page, add message for invalid password

// if res.status = 303, render signup page
// if res.status = 301, render user profile page
// if res.status = 201, render profile page of user


route.post('/', passport.authenticate('local'), (req, res) => {
  const username = req.body.username;
  UserSchema.findOne({username})
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => console.error(err))

  // res.setHeader('Content-Type', 'application/json');
  // res.status(200).json({ success: true, status: 'You are logged in!' });
})

module.exports = route;