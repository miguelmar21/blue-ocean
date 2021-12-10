const route = require('express').Router();

// destructure the schema you need from index.js
const {UserSchema} = require('../../../database');

var updateUser = async function(username, newDocument) {
  return new Promise( async(resolve, reject) => {
      try {
        console.log('about to updateOne')
        const data = await UserSchema.updateOne({ username }, {$set : newDocument })
        console.log('finished updating one!', data)
        resolve (data);
      } catch (err) {
        console.error(`there was an error updating ${username} with `, newDocument, err)
        reject (err);
      }
  });
};




//add example to exampleSchema collection
route.post('/', async (req, res) => {

  const username = req.query.username;
  const newDoc = req.body;
  try {
    var foundUser = await UserSchema.find()
    var updatedUser = await updateUser(username, newDoc);
    res.status(204).send(updatedUser)
  } catch (err) {
    console.error(`update user failed for ${username}`, newDoc, err);
    res.status(500).send(err);
  }


});

module.exports = route;