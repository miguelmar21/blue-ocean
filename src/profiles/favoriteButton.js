import React, { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';


export default function FavoriteButton(props) {
  const addFavorite = function() {
    var clone = JSON.parse(JSON.stringify(props.loggedInUser));
    if (clone.favorites === null) {
      clone.favorites = [props.displayedUser._id];
    } else {
      clone.favorites = [...clone.favorites, props.displayedUser._id];
    }
    console.log(JSON.stringify(clone));
    axios.post('http://localhost:3000/updateUser', clone)
      .then((data) => {
        console.log(data)
        props.updateUser(clone);
        console.log('success');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeFavorite = function() {
    var clone = JSON.parse(JSON.stringify(props.loggedInUser));
    clone.favorites.splice(clone.favorites.indexOf(props.loggedInUser._id),1);
    axios.post('http://localhost:3000/updateUser', clone)
    .then((data) => {
      console.log(data);
      props.updateUser(clone);

    })
    .catch((err) => {
      console.error(err);
    });
  };

  return (
    <div>
      {(props.loggedInUser.favorites === null || props.loggedInUser.favorites.indexOf(props.displayedUser._id) === -1) ?
      <IconButton aria-label="favorite" onClick={addFavorite}>
        <FavoriteBorderIcon/>
      </IconButton>:
      <IconButton aria-label="un-favorite" onClick={removeFavorite}>
        <FavoriteIcon/>
      </IconButton>}
    </div>
  )
}