import React, { useState, useEffect } from "react";
import Band from './band';
import Video from './videos';
import Search from './search';
import EditProfileModal from './editProfileModal.jsx';
import Grid from "@mui/material/Grid";
import FavoriteButton from './favoriteButton';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SocialMedia from './socialMedia';
// import FavoritesList from './favoritesList';

//import components here

export default function Profiles(props) {

  const [user, setUser] = useState(props.loggedInUser);

  return (
    <div>

    {(user !== null) ?
      <div className="profiles">
        <Container>
          <Grid container>
            <Grid item xs={8}>
              <Search setUser={setUser}/>
            </Grid>
            <Grid item xs={4}>
              {(props.loggedInUser.username !== user.username && props.loggedInUser.username !== 'Guest') ? <FavoriteButton updateUser={props.updateUser} displayedUser={user} loggedInUser={props.loggedInUser}/> : <React.Fragment/>}
            </Grid>
            <Grid item xs={4}>
              <img className="profilePic" src={user.user_picture} width="75" height="75"/>
            </Grid>
            <Grid item xs={8}>
              <p>{user.username}</p>
              <p>{user.name}</p>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={3}>
                {(user.categories.indexOf('Music') !== -1)  ?
                  <img src="https://svg-clipart.com/svg/color/oLsCLwr-blue-musical-note-vector.svg" width="35" height="35"/>:<React.Fragment/>}
                {(user.categories.indexOf('Comedy') !== -1)  ?
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/004-rolling-on-the-floor-laughing-1.svg" width="35" height="35"/>:<React.Fragment/>}
                {(user.categories.indexOf('Dance') !== -1)  ?
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Emoji_u1f483.svg" width="35" height="35"/>:<React.Fragment/>}
              </Stack>
              {/* {(user.categories !== undefined) ? user.categories.map((type) => {
                //update map to include icons for different types of performers
                return (<p key={type}>{type}</p>)
              }): <div></div>} */}
            </Grid>
            <Grid item xs={12}>
              <p>{user.bio}</p>
            </Grid>
            <Grid item xs={12}>
              {user.social_media? <SocialMedia user={user}/> : <React.Fragment/>}
            </Grid>
            <Grid item xs={12}>
              <Band user={user}/>
            </Grid>
            <Grid item xs={12}>
              {/* <FavoritesList loggedInUser={props.loggedInUser}/> */}
            </Grid>
            <Grid item xs={12}>
              <Video user={user}/>
            </Grid>
            <Grid item xs={12}>
              <EditProfileModal username={user.username} />
            </Grid>
          </Grid>
        </Container>
    </div> : <div></div>}
  </div>

  )
}

