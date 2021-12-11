
const { User } = require('../../../database');
const route = require('express').Router();

// steps
// check if user has a session.user already
// if they do,
// check if authenticated, if so
// then next
// else error
// if they dont' have a session.user
// challenge them for a username anad password
// once they provide that
// check if in db
// if they are
// then assign a session user and next
// if they're not
// redirect them to signup

// after user successfully signs in, redirect them to profile page with access to resources

// login possibilities
// user already loggedin: on front-end, display already logged in message
//user account doesnt exists: redirect to signup
// password invalid: keepon login page, add message for invalid password

// if res.status = 303, render signup page
// if res.status = 301, render user profile page
// if res.status = 201, render profile page of user


route.post('/', (req, res, next) => {
  let username = req.body.username,
      password = req.body.password;

  if(req.session.user){
    if (req.session.user === 'authenticated'){
      //user successfully validated
      // redirect to user homepage
      // sending to next request for now
      res.status(301).end()
    } else {
      // user with invalid session.user
      // handle gracefully and test
      let err = new Error('has different authentication');
      err.status = 400;
      next(err);
    }
  } else {
    User.findOne({username})
        .then(user => {
          if(!user) {
            // redirect to signup
            res.status(303).send('User does not have an account yet');
          } else {
            if(user.password !== password){
              // on front-end, catch this error and render helpertext asking user for correct password
              let err = new Error('Invalid Password.');
              err.status = 401;
              next(err);
            } else {
              req.session.user = 'authenticated';
              // redirect to profile page of user
              // render profile page of user
              res.status(200).end();
            }
          }
        })
        .catch(err => next(err))
  }
})

module.exports = route;