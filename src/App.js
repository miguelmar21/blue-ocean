import React, { useState } from "react";
import axios from "axios";
import Profiles from "./profiles/profiles.js";
import Map from "./Map/Map";
import PerformersNearby from "./performersNearby/index.js";
import API_KEY from "../config";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Header from "./header/header";

export default function App() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 30.267153,
    lng: -97.743057,
  });
  const [loggedInUser, setLoggedInUser] = useState({
    user_picture:
      "https://northaustinurology.com/app/uploads/2017/01/profile-silhouette.jpg",
    categories: [],
    name: "",
    username: "Guest",
    is_performer: false,
    band: { name: "", members: [] },
    media: [],
    favorites: [],
  });
  const [profileView, setProfileView] = useState(loggedInUser);
  return (
    <div>
      <Container maxWidth="xl">
        <Header setLoggedInUser={setLoggedInUser} />
        <Grid container>
          <Grid item xs={12} className="top-header"></Grid>
          <Grid item xs={3} className="left-section">
            <Grid container>
              <Grid item xs={12}>
                <Profiles
                  updateUser={setLoggedInUser}
                  loggedInUser={loggedInUser}
                  profileView={profileView}
                ></Profiles>
              </Grid>
              <Grid item xs={12}>
                <PerformersNearby location={currentLocation} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Map
              isMarkerShown
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              setCurrentLocation={setCurrentLocation}
              loggedInUser={loggedInUser}
              setProfileView={setProfileView}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
