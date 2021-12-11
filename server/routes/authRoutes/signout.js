const route = require('express').Router();

// steps
// check if session.user
// if not, already logged out
// if session.user and not authenticated
// already logged out
// if session.user and authenticated
// revoke session

// after user logs out, redirect user to common page

// on front-end handle not sending server signout request if not signed in

route.get('/', (req, res, next) => {
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    // redirect to homepage
    res.status(200).end()
  } else {
    let err = new Error('You are not logged in.');
    err.status = 400;
    next(err);
  }
})

module.exports = route;