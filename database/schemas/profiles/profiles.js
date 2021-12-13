const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {index: true, unique: true, type: String, minLength: 7},
  password: String,
  is_performer: { type: Boolean, default: false },
  name: String,
  bio: String,
  user_picture: String,
  social_media: [String],
  categories: [String],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  band: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  media: [String],
  performances: [
    {
      performance_id: { type: Number, unique: true },
      location: String,
      time: String,
      additionalPerformers: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      ],
    },
  ],
});

module.exports = mongoose.model('userSchema', userSchema);