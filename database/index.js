// import schema here
const ExampleSchema = require("./schemas/exampleSchema/exampleSchema");
const userSchema = require("./schemas/profiles/profiles.js");

// include imported schema in the object
module.exports = { ExampleSchema, userSchema };
