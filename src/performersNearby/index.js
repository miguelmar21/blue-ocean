import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchRadius from "./searchRadius";
import { Carousel } from "3d-react-carousal";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

function PerformersNearby(props) {
  let [searchRadius, setSearchRadius] = useState(5);
  let [slides, setSlides] = useState([]);
  let location = props.location;

  //miguel will have a state called location that will be eqaul to the current location (lat & long)
  //usestate location to grab all users from the database where location is <= the search radius
  //populate slides by mapping through the array of objects sent back from the database

  // let slides = [
  //   <div className="PN_performer">
  //     <img src="https://picsum.photos/800/301/?random" alt="2" />
  //     <div className="centered">Performers Name</div>
  //   </div>,
  //   <img src="https://picsum.photos/800/302/?random" alt="3" />,
  //   <img src="https://picsum.photos/800/303/?random" alt="4" />,
  //   <img src="https://picsum.photos/800/304/?random" alt="5" />,
  // ];

  const populateSlides = () => {
    axios
      .get("http://localhost:3000/performersNearby", {
        params: {
          location: location,
          searchRadius: searchRadius,
        },
      })
      .then((performers) => {
        console.log(performers.data);
        let container = [];
        performers.data.map((performer) => {
          let chunk = (
            <div className="PN_performer">
              <img src={performer.user_picture} />
              <h1>{performer.name}</h1>
            </div>
          );
          container.push(chunk);
        });
        setSlides(container);
      })
      .catch((error) => {
        console.log("failed to grab performers");
      });
  };

  //run the populate slides function anytime the location or searchradius changes
  useEffect(() => {
    populateSlides();
  }, [location, searchRadius]);

  return (
    <div className="performersNearby">
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <h1 className="PN_header">Performers Nearby</h1>
        <SearchRadius setSearchRadius={setSearchRadius} />
      </Stack>
      <Carousel slides={slides} />
    </div>
  );
}
// return (
//   <div className="performersNearby">
//     <div className="PN_filter">
//       <h1 className="PN header">Performers Nearby</h1>
//       <SearchRadius setSearchRadius={setSearchRadius} />
//     </div>
//     <Carousel slides={slides} />
//   </div>
// );

export default PerformersNearby;
