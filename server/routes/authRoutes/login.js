
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

route.post('/', (req, res, next) => {
  let username = req.body.username,
      password = req.body.password;

  if(req.session.user){
    if (req.session.user === 'authenticated'){
      //user successfully validated
      // redirect to homepage
      // sending to next request for now
      return next();
    } else {
      // user with invalid session.user
      // handle gracefully and test
    }
  } else {
    User.findOne({username})
        .then(user => {
          if(!user) {
            let err = new Error('Username does not exist.');
            err.status = 401;
            next(err);
          } else {
            if(user.password !== password){
              let err = new Error('Invalid Password.');
              err.status = 401;
              next(err);
            } else {
              res.session.user = 'authenticated';
              res.status(200).redirect('/');
            }
          }
        })
        .catch(err => next(err))
  }
})

module.exports = route;