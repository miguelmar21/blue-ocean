const route = require('express').Router();
const {UserSchema} = require('../../../database');

var getUser = async function(username) {
  return new Promise (async(resolve, reject) => {
    try {
      const data = UserSchema.find({ 'username': username });
      resolve(data)
    } catch (err) {
      console.error(`there was an error loading ${username}'s profile`, err);
    }
  });
}

route.get('/', async (req, res) => {
  const username = req.query.username;
  try {
    var queriedUser = await getUser(username);
    res.status(200).send(queriedUser);
  } catch (err) {
    console.error(`getting user information failed for ${username}`,err);
    res.status(500).send(err);
  }
})

module.exports = route;