import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Grid from '@mui/material/Grid';



export default function Search(props) {

  const [searchText, setSearchText] = useState('');

  const handleChange = e => {
    //possibly refactor to one line
    var inputText = e.target.value;
    setSearchText(inputText)
  }
  const handleSearch = e => {
    axios
      .get('http://localhost:3000/getUser', {
        params: {
          username: searchText
        }
      })
      .then((queriedUser) => {
        console.log(JSON.stringify(queriedUser));
        if (queriedUser.data[0] === undefined) {
          alert(`${searchText} is not registered on Buskamove`);
          setSearchText('');
        } else {
          props.setUser(queriedUser.data[0]);
          setSearchText('');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={8}>
          <TextField
            variant='outlined'
            label='Search for a performer'
            onChange={handleChange}
            value={searchText}
            size='small'
          />
        </Grid>
        <Grid item xs={4}>
          <button onClick={handleSearch}>Search</button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
