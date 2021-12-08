const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  age: {
    type: Number,
    min: 21,
    default: 21
  }
})

module.exports = mongoose.model('exampleSchema', ExampleSchema);