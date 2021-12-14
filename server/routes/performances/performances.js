const route = require('express').Router();
const {UserSchema} = require('../../../database');

route.put('./', (req, res) => {

})
// db.userschemas.updateOne({username: "Miguelito"}, {$push: {performances: 'test1'}})
// db.userschemas.updateOne({username: "Miguelito"}, { $pull: {performances: "test1"}})

module.exports = route;