// const route = require('express').Router();
// const {userSchema} = require('../../../database')

// lattitue to miles conversion
// .015 degrees = 1 mile

// longitude to miles conversion
// .018 degrees = 1 mile

// route.get('/performersNearby', (req, res) => {
//   let location = req.body.//something
//   let searchRadius = req.body.//something
//   let latitudeRange = {
//    upper: location.latitude + (searchRadius * .015),
//    lower: location.latitude - (searchRadius * .015)
//   }
//   let longitudeRange = {
//    upper: location.longitude + (searchRadius * .018),
//    lower: location.longitude - (searchRadius * .018)
//  }

//   //query all the users if is_performer = true
//   userSchema.find({is_performer: true})
//     .then(allPerformers => {
//       let nearbyPerfomers = [];
//       //map through all the performers
//       allPerformers.map(performer => {
//         //map through all the performances inside of each performer
//         performer.performances.map(performance => {
//           //push the performer object into nearbyPerformers if the location of any of the performances is <= the given location
//           if (
//             performance.location.latitude <= latitudeRange.upper &&
//             performance.location.latitude >= latitudeRange.lower &&
//             performance.location.longitude <= longitudeRange.upper &&
//             performance.location.longitude >= longitudeRange.lower
//           ) {nearbyPerfomers.push(performer)}
//         })
//       })
//       res.send(nearbyPerfomers);
//     })
//     .catch(error => {
//       res.status(400).send('failed to get performers', error)
//     })
// });
