const route = require('express').Router();
const {UserSchema} = require('../../../database');

var updateUser = async function(username, newDocument) {
  return new Promise( async(resolve, reject) => {
      try {
        const data = await UserSchema.updateOne({ username }, {$set : newDocument })
        resolve (data);
      } catch (err) {
        console.error(`there was an error updating ${username} with `, newDocument, err)
        reject (err);
      }
  });
};

//search collection for update document(searched by username), replace with request body (JSON object)
route.post('/', async (req, res) => {
  const username = req.body.username;
  const newDoc = req.body;
  try {
    var updatedUser = await updateUser(username, newDoc);
    res.status(202).send(updatedUser)
  } catch (err) {
    console.error(`update user failed for ${username}`, newDoc, err);
    res.status(500).send(err);
  }
});

module.exports = route;