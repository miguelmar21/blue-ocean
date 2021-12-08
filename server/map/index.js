var routes = require('express').Router();

routes.get('/', (req, res) => {
  console.log('get request received!')
  res.status(200).send('I have received your get request!')
});

module.exports = routes;