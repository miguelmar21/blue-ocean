import React, { useState, useEffect } from "react";
import Video from './videos';
import Search from './search';
import EditProfileModal from './editProfileModal.jsx';
import Grid from "@mui/material/Grid";
import FavoriteButton from './favoriteButton';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SocialMedia from './socialMedia';
import FavoritesList from './favoritesList';


export default function Profiles(props) {

  const [user, setUser] = useState(props.loggedInUser);

  useEffect(() => {
    if (user.username === props.loggedInUser.username || user.username === 'Guest') {
      setUser(props.loggedInUser)
    }
  }, [props.loggedInUser]);

  return (
    <div>
    {(user !== null) ?
      <div className="profiles">
        <Grid container>
          <Grid item xs={12}>
            <Search setUser={setUser}/>
          </Grid>
          <Grid item xs={4} display='flex' alignItems='center'>
            <div className="profilePicContainer" >
              <img className="profilePic" src={user.user_picture} width="70px" height="70px"/>
            </div>
          </Grid>
          <Grid item xs={6}>
            <p className="name">{user.name}</p>
            <p className="username">@{user.username}</p>
            <Stack direction="row" spacing={5} sx={{mt: "15px"}}>
              {user.categories !== undefined
              ? <>
                {(user.categories.indexOf('Music') !== -1)  ?
                  <img classname="performerIcon" src="https://svg-clipart.com/svg/color/oLsCLwr-blue-musical-note-vector.svg" width="35" height="35"/>:<></>}
                </>
              : <></>}
              {props.loggedInUser.categories !== undefined
              ? <>
                {(user.categories.indexOf('Comedy') !== -1)  ?
                  <img classname="performerIcon" src="https://upload.wikimedia.org/wikipedia/commons/e/e7/004-rolling-on-the-floor-laughing-1.svg" width="35" height="35"/>:<></>}
                </>
              : <></>}
              {props.loggedInUser.categories !== undefined
              ? <>
                {(user.categories.indexOf('Dance') !== -1)  ?
                  <img classname="performerIcon" src="https://upload.wikimedia.org/wikipedia/commons/9/97/Emoji_u1f483.svg" width="35" height="35"/>:<></>}
                </>
              : <></>}
            </Stack>
          </Grid>
          <Grid item xs={2}>
            {(props.loggedInUser.username !== user.username && props.loggedInUser.username !== 'Guest') ? <FavoriteButton updateUser={props.updateUser} displayedUser={user} loggedInUser={props.loggedInUser}/> : <React.Fragment/>}
          </Grid>
          {/* <Grid item xs={12}>
          </Grid> */}
          <Grid item xs={12} justifyContent="center">
            <p className="bio">{user.bio}</p>
          </Grid>
          <Grid item xs={12} justifyContent='center' display="flex">
            {user.social_media? <SocialMedia user={user}/> : <React.Fragment/>}
          </Grid>
          <Grid item xs={12}>
            <FavoritesList user={user}/>
          </Grid>
          {user.media !== undefined ?
            <Grid item xs={12} overflow="auto">
              <div style={{height: "200px"}}>
                <Video user={user}/>
              </div>
            </Grid> : <></>}
          <Grid item xs={12} display="flex" justifyContent='center'>
            {props.loggedInUser.username === user.username && user.username !== 'Guest' ? <EditProfileModal username={user.username} setUser={setUser}/> :<></>}
          </Grid>
        </Grid>
    </div> : <div></div>}
  </div>
  )
}

