const route = require('express').Router();
const {UserSchema} = require('../../../database');

route.put('/', async (req, res) => {
  try {
    const data = await UserSchema.updateOne({username: req.body.username}, {$push: {performances: {
      location: req.body.location,
      time: req.body.time,
      category: req.body.category,
      additionalPerformers: req.body.additionalPerformers
    }}})
    res.status(201).send(data);
  } catch {
    res.status(500).send('Could not update database');
  }
})

route.get('/', async (req, res) => {
  try {
    const data = await UserSchema.find({performances: { $exists: true, $ne: []}}, {performances: 1,_id: 0})
    res.status(200).send(data);
  } catch{
    res.status(500).send('Could not fetch from database');
  }
})
// db.userschemas.updateOne({username: "Miguelito"}, {$push: {performances: 'test1'}})
// db.userschemas.updateOne({username: "Miguelito"}, { $pull: {performances: "test1"}})

module.exports = route;
