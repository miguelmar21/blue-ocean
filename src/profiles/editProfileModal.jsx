import React from 'react'
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import axios from 'axios'


export default function EditProfileModal(props) {

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #ff0',
  boxShadow: 12,
  p: 4,
  borderRadius: 15
};

const [details, setDetails] = useState({username: props.username})

var convertToArrays = function(naiveDetails) {
  //convert the appropriate fields in naive details to arrays
  //return the result
  let betterDetails = naiveDetails;
  //for now, expect the would-be arrays to be comma-delimited.


  return betterDetails;
}

var saveText = function(field, e) {
  var val = e.target.value;
  var t = JSON.parse(`{"${field}": "${val}"}`);
  let newDetails = Object.assign(details, t)
  setDetails(newDetails)
}

var submit = function() {
  console.log('submitting ', details)
  //operate on array fields and convert to arrays
  let properlyStructuredDetails = convertToArrays(details);

  //update this to a PUT request after deployment works the first time
  axios.post('http://localhost:3000/updateUser', properlyStructuredDetails)
  .then((success)=> {
    console.log('success!', success);
  })
  .catch((err)=> {
    console.error('error!', err);
  })
}

useEffect(() => {
  //query the db for user details and populate
  //borrow Adam's code to do this when he's done
  console.log('borrow Adam\'s code to populate the modal')
  let getURL = `http://localhost:3000/getUser?username=${props.username}`
  console.log('getURL is', getURL)
  axios.get(getURL)
  .then((success)=> {
    console.log('Should be Miguelito!', success.data);
    setDetails(success)
  })
  .catch((err)=> {
    console.error('error!', err);
  })
}, [props.username]);



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [username, setUsername] = useState();
  const uid = username;

  return (
    <div>

      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >


        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Profile
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
            <table><tbody>
              <tr><td>name: </td><td><input type='text' id='name' size='20' onChange={saveText.bind(null,'name')}></input></td></tr>
              <tr><td>password:  </td><td><input type='text' id='password' size='20' onChange={saveText.bind(null,'password')}></input></td></tr>
              <tr><td>is_performer: </td><td><input type='text' id='is_performer' size='20' onChange={saveText.bind(null,'is_performer')}></input></td></tr>
              <tr><td>bio: </td><td><input type='text' id='bio' size='20' onChange={saveText.bind(null,'bio')}></input></td></tr>
              <tr><td>user_picture: </td><td><input type='text' id='user_picture' size='20' onChange={saveText.bind(null,'user_picture')}></input></td></tr>
              <tr><td>social_media: []</td><td><input type='text' id='social_media' size='20' onChange={saveText.bind(null,'social_media')}></input></td></tr>
              <tr><td>categories: []</td><td><input type='text' id='categories' size='20' onChange={saveText.bind(null,'categories')}></input></td></tr>
              <tr><td>favorites: [] </td><td><input type='text' id='favorites' size='20' onChange={saveText.bind(null,'favorites')}></input></td></tr>
              <tr><td>band: []</td><td><input type='text' id='band' size='20' onChange={saveText.bind(null,'band')}></input></td></tr>
              <tr><td>media: []</td><td><input type='text' id='media' size='20' onChange={saveText.bind(null,'media')}></input></td></tr>

            </tbody></table>
          </Typography>
          <Button onClick={submit}>Submit</Button>
        </Box>
      </Modal>

    </div>
  )
}

