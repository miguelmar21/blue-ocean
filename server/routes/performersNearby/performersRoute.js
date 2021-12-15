const route = require("express").Router();
const { userSchema } = require("../../../database");

// lattitue to miles conversion
// .015 degrees = 1 mile

// longitude to miles conversion
// .018 degrees = 1 mile

route.get("/", (req, res) => {
  console.log(req.query);
  let location = JSON.parse(req.query.location);
  let searchRadius = Number(req.query.searchRadius);

  let latitudeRange = {
    upper: location.lat + searchRadius * 0.015,
    lower: location.lat - searchRadius * 0.015,
  };
  let longitudeRange = {
    upper: location.lng + searchRadius * 0.018,
    lower: location.lng - searchRadius * 0.018,
  };

  //query all the users if is_performer = true
  userSchema
    .find({ is_performer: true })
    .then((allPerformers) => {
      let nearbyPerfomers = [];
      //map through all the performers
      allPerformers.map((performer) => {
        //map through all the performances inside of each performer
        performer.performances.map((performance) => {
          //push the performer object into nearbyPerformers if the location of any of the performances is <= the given location
          if (
            performance.location.latitude <= latitudeRange.upper &&
            performance.location.latitude >= latitudeRange.lower &&
            performance.location.longitude <= longitudeRange.upper &&
            performance.location.longitude >= longitudeRange.lower
          ) {
            nearbyPerfomers.push(performer);
            //break?
          }
        });
      });
      res.send(nearbyPerfomers);
    })
    .catch((error) => {
      res.status(400).send("failed to get performers", error);
    });
});

module.exports = route;
