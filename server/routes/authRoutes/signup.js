const { User } = require('../../../database');
const route = require('express').Router();

// steps
// check if session has a session.user already
// if already session.user
// check to see if authenticated
// if it's authenticated, then already logged
// if session.user doesn't exist then
// proceed normally
// ask for username and password if absent
// check to see if username doesnt exist already
// add username and password to database
// create session.user for user
// log in

// after user successfully signs in, redirect user to profile page with access to resources

// user trying to signup
// possibilities
// user already logged in: redirect to homepage
// username/email already exists: redirect to login page

// On front end
// if res.status = 303, render login page
// if res.status = 301, render user profile page
// if res.status = 201, render profile page of user

route.post('/', (req, res, next) => {
  if(!req.session.user) {
    let username = req.body.username,
        password = req.body.password;

    //server-side validation: check to see if username and password are valid:
    //if (validate(username, password)) {proceed} else {send error message}
    if(!(/$^|.+@.+..+/).test(username)) {
      let err = new Error('Invalid email');
      err.status = 400;
      return next(err);
    }
    User.findOne({username})
        .then(user => {
          if(user){
            //user already exists trying to signup, handle gracefully
            // redirect to user homepage
            // ideally redirect to login page
            // can handle on front end to
            // render login modal instead with additional message that user already has account
            res.status(303).send('Already signed up');
          } else {
            User.create({ username, password })
              .then(user => {
                req.session.user = 'authenticated';
                // you could redirect to a get request for the profile page of the particular user
                // will happen on backend
                res.status(201).send(user)}
                )
              .catch(err => {
                console.log(err.message)
                res.status(400).send('Failed to add user to database.')})
          }
        })
        .catch(err => res.status(400).send('Failed to query database'))
  } else {
    // user already logged in
    if(req.session.user === 'authenticated') {
      // redirect to user homepage
      // modify to include path for pulling up user homepage
      res.status(301).end();
    } else {
      //user with unauthenticated session.user trying to login
    // handle gracefully
    // not possible to exists, but if it does
    let err = new Error('has different authentication');
    err.status = 400;
    next(err);}
  }
})

module.exports = route;