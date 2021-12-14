import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';



export default function Search(props) {
  const [user, setUser] = useState({user_picture: 'https://northaustinurology.com/app/uploads/2017/01/profile-silhouette.jpg'})
  const [searchText, setSearchText] = useState();
  const handleChange = e => {
    //possibly refactor to one line
    var inputText = e.target.value;
    setSearchText(inputText)
  }
  const handleSearch = e => {
    axios.get('http://localhost:3000/getUser', {
      params: {
        username: searchText
      }
    })
    .then((queriedUser) => {
      // console.log(queriedUser);
      if(queriedUser.data.length > 0) {
        console.log('setting user to ', queriedUser.data[0])
        setUser(queriedUser.data[0])
        console.log('user is ', user)
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }
  return (
    <React.Fragment>
      <TextField
        variant='outlined'
        label='Search for a performer'
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </React.Fragment>
  )
}
