const route = require('express').Router();
const {UserSchema} = require('../../../database');

route.put('/', async (req, res) => {
  try {
    const data = await UserSchema.updateOne({username: "Miguelito"}, {$push: {performances: {
      location: {
        lat: 1,
        lng: 2
      },
      time: '9',
      category: 'comedy',
      additionalPerformers: null
    }}})
    console.log(data);
  } catch {
    console.log('no good');
  }
})

// db.userschemas.updateOne({username: "Miguelito"}, {$push: {performances: 'test1'}})
// db.userschemas.updateOne({username: "Miguelito"}, { $pull: {performances: "test1"}})

module.exports = route;
