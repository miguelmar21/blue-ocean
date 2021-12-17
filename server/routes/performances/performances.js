const route = require('express').Router();
const {UserSchema} = require('../../../database');

route.get('/', async (req, res) => {
  try {
    const data = await UserSchema.find({performances: { $exists: true, $ne: []}})
    res.status(200).send(data);
  } catch(error){
    res.status(500).send('Could not fetch from database')
    console.log(error);
  }
})

route.post('/', async (req, res) => {
  try {
    const data = await UserSchema.updateOne({username: req.body.username}, {$push: {performances: {
      username: req.body.username,
      location: req.body.location,
      time: req.body.time,
      category: req.body.category,
      additionalPerformers: req.body.additionalPerformers
    }}})
    res.status(201).send(data);
    console.log(data)
  } catch {
    res.status(500).send('Could not update database');
    console.log('did not work', data)
  }
})

route.patch('/', async (req, res) => {
  console.log(req.body)
  try {
    const data = await UserSchema.updateOne( {username: req.body.username}, {$pull: {performances: {location: {lat: req.body.lat, lng: req.body.lng}}}})
    res.status(200).send(data);
  } catch {
    res.status(500).send('Could not patch database')
  }
})

module.exports = route;
