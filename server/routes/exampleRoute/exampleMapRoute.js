const route = require('express').Router();
const {ExampleSchema} = require('../../../database');

//add example to exampleSchema collection
route.post('/', (req, res) => {
  let name = req.body.name;
  let age = req.body.age
  ExampleSchema.create({name, age})
    .then(example => {
      console.log("example create");
      res.send('successful');
    })
    .catch(err => {
      console.error(err);
      res.status(400).send('successful');
    })
});

module.exports = route;