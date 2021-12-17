import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';


export default function Profiles(props) {
  const onTwitter = (event) =>  {
    event.preventDefault();
    window.open(props.user.social_media.twitter,'_blank');
  }

  const onFacebook = (event) => {
    event.preventDefault();
    window.open(props.user.social_media.facebook,'_blank');
  }

  const onInstagram = (event) => {
    event.preventDefault();
    window.open(props.user.social_media.instagram,'_blank');
  }
  return (
    <Stack direction="row" spacing={3}>
      {props.user.social_media.twitter ?
      <IconButton aria-label="twitter" onClick={onTwitter}>
        <TwitterIcon/>
      </IconButton>: <React.Fragment/>}
      {props.user.social_media.facebook ?
      <IconButton aria-label="facebook" onClick={onFacebook}>
        <FacebookIcon/>
      </IconButton>: <React.Fragment/>}
      {props.user.social_media.instagram ?
      <IconButton aria-label="instagram" onClick={onInstagram}>
        <InstagramIcon/>
      </IconButton>: <React.Fragment/>}
    </Stack>
  )
}