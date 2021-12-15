const { UserSchema } = require('../../../database');
const route = require('express').Router();
const passport = require('passport');
const url = require('url');

route.post('/', (req, res) => {

    let username = req.body.username,
        password = req.body.password;
  // let social_media = {
  //   twitter: '',
  //   facebook: '',
  //   instagram: '',
  // };

  UserSchema.register(new UserSchema({ username, social_media }), password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        console.log(err)
        res.setHeader('Content-Type', 'application/json');
        res.json({ err });
      } else {
        // redirect to profile page
        passport.authenticate('local')(req, res, () => {
          res.status(200);
          res.setHeader('Content-Type', 'application/json');
          res.send();
        })
      }
    })
})

module.exports = route;