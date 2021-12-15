import React from 'react';
import { useState, useEffect } from 'react';
import Band from './band';
import Video from './videos';
import Search from './search';
import EditProfileModal from './editProfileModal.jsx';
import Grid from "@mui/material/Grid";

//import components here

export default function Profiles(props) {

  const [user, setUser] = useState({user_picture: 'https://northaustinurology.com/app/uploads/2017/01/profile-silhouette.jpg',
  categories: [],
  name: '',
  username: 'Guest',
  band: {name: '', members: []},
  media: []});

  return (
    <div>

    {(user !== null) ?
      <div>
        <Grid container>
          <Grid item xs={4}/>
          <Grid item xs={8}>
            <Search setUser={setUser}/>
          </Grid>
          <Grid item xs={4}>
            <img className="profilePic" src={user.user_picture} width="100" height="100"/>
          </Grid>
          <Grid item xs={8}>
            <p>{`${user.name}, ${user.username}`}</p>
          </Grid>
          <Grid item xs={12}>
            {(user.categories !== undefined) ? user.categories.map((type) => {
              //update map to include icons for different types of performers
              return (<p key={type}>{type}</p>)
            }): <div></div>}
          </Grid>
          <Grid item xs={12}>
            <p>{user.bio}</p>
          </Grid>
          <Grid item xs={12}>
            <Band user={user}/>
          </Grid>
          <Grid item xs={12}>
            <Video user={user}/>
          </Grid>
          <Grid item xs={12}>
            <EditProfileModal username={user.username} />
          </Grid>
        </Grid>
    </div> : <div></div>}
  </div>

  )
}

