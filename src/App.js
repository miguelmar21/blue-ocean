import React, {useState} from "react";
import axios from 'axios';
import Profiles from './profiles/profiles.js';
import Map from "./Map/Map";
import PerformersNearby from "./performersNearby/index.js";
import API_KEY from '../config';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function App() {

/* default user
{user_picture: 'https://northaustinurology.com/app/uploads/2017/01/profile-silhouette.jpg',
categories: [],
name: '',
username: 'Guest',
band: {name: '', members: []},
media: []}
*/
const [loggedInUser, setLoggedInUser] = useState({
  username: 'theRealJaden',
  password: 'password',
  is_performer: true,
  name: 'Jaden Smith',
  bio: "How can mirrors be real if our eyes aren't real?",
  user_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/88/2019_-_Opening_Night_SM1_0368_%2849015104751%29.jpg',
  social_media: {
    twitter: 'https://twitter.com/jaden?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
    facebook: 'https://www.facebook.com/officialjaden',
    instagram: 'https://www.instagram.com/c.syresmith/'
  },
  categories: [ 'Music' ],
  favorites: null,
  band: null,
  media: [
    'https://www.youtube.com/embed/cmc8q2dcIMs',
    'https://www.youtube.com/embed/icpl9DEagsk',
    'https://www.youtube.com/embed/huRFB-urWAc'
  ],
  performances: [],
  });
  return (
      <div>
        <Container>
          <Grid container>
            <Grid item xs={3}>
              <Grid container>
                <Grid item xs={12}>
                  <Profiles updateUser={setLoggedInUser} loggedInUser={loggedInUser}></Profiles>
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
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
  )
}
