import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';


const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: 'flex',
    paddingRight: "20px",
    paddingLeft: "10px",
    marginTop: "5px",
    marginBottom: "5px",
    width:"100%",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "10px",
  },
  searchInput: {
    width:"100%",
    margin: "5px"
  }
}));

export default function Search(props) {

  const [searchText, setSearchText] = useState('');
  const classes = useStyles();
  const handleChange = e => {
    //possibly refactor to one line
    var inputText = e.target.value;
    setSearchText(inputText)
  }
  const handleSearch = e => {
    if (e.key === 'Enter') {
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
    }
  return (
    <React.Fragment>
        <div className={classes.searchContainer}>
          <SearchIcon className={classes.searchIcon}/>
          <TextField
            className={classes.searchInput}
            label='Search for a performer'
            onChange={handleChange}
            value={searchText}
            size='small'
            onKeyPress={handleSearch}
          />
        </div>
    </React.Fragment>
  )
}
