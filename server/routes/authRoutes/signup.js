const { UserSchema } = require('../../../database');
const route = require('express').Router();
const passport = require('passport');
const url = require('url');

route.post('/', (req, res) => {

    let username = req.body.username,
        password = req.body.password;
    let social_media = {
      twitter: '',
      facebook: '',
      instagram: '',
    };

  UserSchema.register(new UserSchema({ username, social_media }), password, (err, user) => {
      if (err) {
        let error = new Error('');
        error.message = err.errors ? 'Username must be at least 7 characters' : 'You already have an account.Please login.';
        error.status = 500;
        res.status(error.status).send({ message: error.message});
      } else {
        // redirect to profile page
        passport.authenticate('local')(req, res, () => {
          UserSchema.find({username})
                    .then(user => res.status(200).send(user))
                    .catch(err => console.log(err))
        })
      }
    })
})

module.exports = route;