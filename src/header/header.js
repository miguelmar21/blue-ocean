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


const Header = () => {

  const [loggedIn, logIn] = useState(false);

  return (
    <AppBar position="static" sx={style}>
      <Toolbar>
        <Grid container alignItems='center'>
          <Grid item style={{}}>
            <Stack direction="row" spacing={2}>
              <Login />
              <Signup />
            </Stack>
          </Grid>
          <Grid item sm ></Grid>
          <Grid item style={{}}>
            <Signout />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header;