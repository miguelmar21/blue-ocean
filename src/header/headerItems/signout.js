import React, {useState, useEffect} from 'react';
import Button from '../button';
import axios from 'axios';

const Signout = () => {
  const handleClick = () => {
    // axios
    //   .get(`http://localhost:3000/signout`, { username: values.username, password: values.password1 })
    //   .then(response => {
    //     // handleClose();
    //     // reset();
    //   })
    //   .catch(err => {
    //     // setErrors({
    //     //   ...temp,
    //     //   'username': 'Email already has account. Please login.'
    //     // })
    //   })
  }
  return(
    <Button
      text="Log Out"
      variant="outlined"
      onClick={handleClick}
    />
  )
}

export default Signout;