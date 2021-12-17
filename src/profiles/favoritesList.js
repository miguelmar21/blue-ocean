import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FavoritesList(props) {
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    axios
    .get('http://localhost:3000/getFavorites', {
      params: {
        favorites: props.user.favorites
      }
    })
    .then((favorites) => {
      console.log(favorites);
    })
    .catch((err) => {
      console.error(err);
    });
  },[props.user]);

  return(
    <div>
      {/* <h4>Favorites</h4>
      {props.loggedInUser.map((user) => {
      })} */}
    </div>
  )
}