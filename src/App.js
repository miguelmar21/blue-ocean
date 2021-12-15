import React, {useState} from "react";
import axios from 'axios';
import Profiles from './profiles/profiles.js';
import Map from "./Map/Map";
import PerformersNearby from "./performersNearby/index.js";
import API_KEY from '../config';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function App() {
const [loggedInUser, setLoggedInUser] = useState();
  return (
      <div>
        <Container>
          <Grid container>
            <Grid item xs={12} className="top-header">
              <div>Hello this is the header</div>
            </Grid>
            <Grid item xs={3} className="left-section">
              <Grid container>
                <Grid item xs={12}>
                  <Profiles></Profiles>
                </Grid>
                <Grid item xs={12}>
                  <PerformersNearby/>
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
              />
            </Grid>
          </Grid>
        </Container>
      </div>
  )
}
