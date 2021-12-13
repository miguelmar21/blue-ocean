import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function Search(props) {
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
        console.log(queriedUser);
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
