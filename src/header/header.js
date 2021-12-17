import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Signup from './headerItems/signup';
import Login from './headerItems/signin';
import Signout from './headerItems/signout'



const style = {
  backgroundColor: '#fff',
  transform: 'translateZ(0)',
  elevation: 0
}


const Header = ({ setLoggedInUser}) => {
  const [display, setDisplay] = useState('Login');
  const [username, setUsername] = useState('');


  return (
    <AppBar position="static" sx={style}>
      <Toolbar>
        <Grid container alignItems='center'>
          <Grid item sm={11} style={{}}>
            <Stack direction="row" spacing={2}>
              <Login setLoggedInUser={setLoggedInUser} display={display} setDisplay={setDisplay} username={username} setUsername={setUsername}/>
              <Signup setLoggedInUser={setLoggedInUser} display={display} setDisplay={setDisplay} username={username} setUsername={setUsername}/>
            </Stack>
          </Grid>
          <Grid item sm={1}>
            <div className="logo"></div>
          </Grid>
          <Grid item sm ></Grid>
          <Grid item style={{}}>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header;