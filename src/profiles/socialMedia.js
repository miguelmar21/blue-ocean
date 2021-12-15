import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';


export default function Profiles(props) {
  return (
    <Stack direction="row" spacing={3}>
      {props.user.social_media.twitter ?
      <IconButton aria-label="twitter">
        <TwitterIcon/>
      </IconButton>: <React.Fragment/>}
      {props.user.social_media.facebook ?
      <IconButton aria-label="facebook">
        <FacebookIcon/>
      </IconButton>: <React.Fragment/>}
      {props.user.social_media.instagram ?
      <IconButton aria-label="instagram">
        <InstagramIcon/>
      </IconButton>: <React.Fragment/>}
    </Stack>
  )
}