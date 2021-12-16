const route = require('express').Router();
const {UserSchema} = require('../../../database');

var getFavorites = async function(favorites) {
  return new Promise (async(resolve, reject) => {
    try {
      const data = UserSchema.find({"$in": favorites})
    } catch (err) {
      console.error('there was an error fetching the user favorites', err);
    }
  });
}

route.get('/', async (req, res)=> {
  try {
    console.log('favorites', favorites);
    var favoritedUsers = await getFavorites(req.query.favorites);
    res.status(200).send(favoritedUsers);
  } catch (err) {
    console.error(`getting favorite information failed`, err);
    res.status(500).send(err);
  }
})

module.exports=route;