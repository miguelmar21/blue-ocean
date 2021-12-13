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
  width: 300,
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
  handleOpen();

}, []);



  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >


        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Performance View
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
            <table align='center'><tbody>
              <tr>
                <td>
                  <img src='https://media-exp1.licdn.com/dms/image/C4D03AQFbYWzXl5btDw/profile-displayphoto-shrink_100_100/0/1626725202784?e=1643846400&v=beta&t=tYnIot-RdOL7ciCnI0LYsl4eRNY1lgZosBjucOGzowY'></img>
                </td>
                <td bgcolor='FFFFAA'>
                  <table><tbody>
                    <tr><td>The Educators</td></tr>
                    <tr><td align='right'>Music</td></tr>
                  </tbody></table>
                </td>
              </tr>
              <tr><td colspan='2' align='center'>9PM, 12/21/21</td></tr>
              <tr><td colspan='2' align='center'>1 Brookings Drive,
              Saint Louis, MO</td></tr>
              <tr><td colspan='2' align='center'>[ profile ]</td></tr>
            </tbody></table>
          </Typography>
          {/* <Button onClick={submit}>Submit</Button> */}
        </Box>
      </Modal>

    </div>
  )
}
