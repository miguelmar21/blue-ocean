const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {index: true, unique: true, type: String, minLength: 7},
  password: String,
  is_performer: { type: Boolean, default: false },
  name: String,
  bio: String,
  user_picture: String,
  social_media: {twitter: String,
                 facebook: String,
                 instagram: String,
                },
  categories: [String],
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  band: {name: String,
        members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]},
  media: [String],
  performances: [{
    performance_id: {type: Number, unique: true, sparse:true},
    location: {
      lat: Number,
      lng: Number
    },
    time: String,
    category: String,
    additionalPerformers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  }]
});
// add additional users with the function below
// async function testUser() {
//   var User = mongoose.model("userschema", userSchema);

//   const userDoc = new User({
//     username: 'Jemaine',
//     password: 'password',
//     is_performer: true,
//     name: 'Jemaine Clement',
//     bio: 'a New Zealand actor, comedian, director, musician, singer and writer. With Bret McKenzie, as the Grammy Award-winning comedy duo Flight of the Conchords, he has released several albums and created comedy series for both the BBC and HBO. For the comedy series, he received six Primetime Emmy nominations.',
//     user_picture: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Flight_Of_The_Conchords_-_Soho_Theatre_-_Sunday_25th_February_2018_ConchordsSoho250218-8_%2839861151994%29_%28cropped%29.jpg',
//     social_media: { twitter:'https://twitter.com/AJemaineClement?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' },
//     categories: [ 'Comedy', 'Music' ],
//     favorites: [],
//     band: {name: 'Flight of The Conchords'},
//     media: [
//       'https://www.youtube.com/embed/sOgC8qp_I2Y'
//     ],
//   })
//   try {
//     const data = await userDoc.save();
//     console.log('insert worked!', data)
//   } catch(err) {
//     console.log('error Saving Answer!', err)
//   }
// }
// testUser();
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('userSchema', userSchema);

