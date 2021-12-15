const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {index: true, unique: true, type: String, minLength: 7},
  password: String,
  // is_performer: { type: Boolean, default: false },
  // name: String,
  // bio: String,
  // user_picture: String,
  // social_media: {twitter: String,
  //                facebook: String,
  //                instagram: String,
  //               },
  // categories: [String],
  // favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  // band: {name: String,
  //       members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]},
  // media: [String],
  // performances: [{
  //   performance_id: {type: Number, unique: true, sparse:true},
  //   location: String,
  //   time: String,
  //   category: String,
  //   additionalPerformers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  // }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('userSchema', userSchema);

