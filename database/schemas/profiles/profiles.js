const mongoose = require("mongoose");
const db = require("../index.js");

const userSchema = new mongoose.Schema({
  //add min length validator for username
  username: { index: true, unique: true, type: String, minLength: 7 },
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

module.exports = mongoose.model("User", userSchema);

// async function addUser() {

//       User.create({
//       username: 'Miguelito',
//       password: 'password',
//       is_performer: true,
//       name: 'Miguel Regalado',
//       bio: 'I like music :D',
//       user_picture: 'https://scontent-dfw5-1.xx.fbcdn.net/v/t39.30808-6/242789158_4545669642164024_85677028077753648_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=KziBUEFsI-QAX-xWa4w&tn=rcDe_YIWfxUX59MO&_nc_ht=scontent-dfw5-1.xx&oh=af06feef93ed522c62543bb74a392467&oe=61B57C1F',
//       social_media: ['https://www.facebook.com/miguel.regalado.75'],
//       categories: ['Comedy', 'Music'],
//       favorites: null,
//       band: null,
//       media: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'],
//       performances: null

//   })
//   .then ((result) => {
//     console.log('success!', result);
//   })
//   .catch( (e)=> {
//     console.log('Didnt work!', e.message)
//   })
// }

// //performance location may need to be changed to longitude, latitude
