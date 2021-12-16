const route = require("express").Router();
const { UserSchema } = require("../../../database");

// lattitue to miles conversion
// .015 degrees = 1 mile

// longitude to miles conversion
// .018 degrees = 1 mile

route.get("/", async (req, res) => {
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

  try {
    const getPerformers = await UserSchema.find({ is_performer: true });
    console.log(getPerformers);
    let nearbyPerfomers = [];

    for (let i = 0; i < getPerformers.length; i++) {
      let performer = getPerformers[i];
      for (let j = 0; j < performer.performances.length; j++) {
        let performance = performer.performances[j];
        if (
          performance.location.lat <= latitudeRange.upper &&
          performance.location.lat >= latitudeRange.lower &&
          performance.location.lng <= longitudeRange.upper &&
          performance.location.lng >= longitudeRange.lower
        ) {
          nearbyPerfomers.push(performer);
          break;
        }
      }
    }
    res.send(nearbyPerfomers);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = route;
