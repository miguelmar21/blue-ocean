const express = require("express");
const app = express();
require('dotenv').config()
app.use(express.static(__dirname + '/../dist'));
const PORT = process.env.PORT || 3000;










app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`)
});