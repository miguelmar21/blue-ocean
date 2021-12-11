import React from 'react'
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import axios from 'axios'


export default function TagViewModal(props) {

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

const [details, setDetails] = useState({location: props.location})

//query the db for tag details and populate
var setTagData = function() {

}


useEffect(() => {
  console.log('populate the modal with tag data');
  setTagData();
}, []);



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            Tag View
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
            <table><tbody>
              <tr><td>user_picture: </td><td><input type='text' id='user_picture' size='20' ></input></td></tr>
              <tr><td>name </td><td><input type='text' id='name' size='20' ></input></td></tr>
              <tr><td>category  </td><td><input type='text' id='category' size='20' ></input></td></tr>
              <tr><td>time: </td><td><input type='text' id='time' size='20' ></input></td></tr>
              <tr><td>location: </td><td><input type='text' id='location' size='20' ></input></td></tr>
              <tr><td>profile: </td><td><input type='text' id='profile' size='20' ></input></td></tr>
            </tbody></table>
          </Typography>
          <Button onClick={submit}>Submit</Button>
        </Box>
      </Modal>

    </div>
  )
}
