const route = require('express').Router();
const passport = require('passport');

route.get('/', (req, res, next) => {
  req.logout();
  res.redirect('/');
})

module.exports = route;