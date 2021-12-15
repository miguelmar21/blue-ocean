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
const [user, setUser] = useState({user_picture: 'https://northaustinurology.com/app/uploads/2017/01/profile-silhouette.jpg'})

var convertToArrays = function(naiveDetails) {
  //convert the appropriate fields in naive details to arrays
  //return the result
  let betterDetails = naiveDetails;
  //for now, expect the would-be arrays to be comma-delimited.


  return betterDetails;
}

var splitFields = function(twoFields, val) {
  //returns an object
  var fields = twoFields.split('.')

  return fields;
}

var saveText = function(field, e) {
  var val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

  if(e.target.type === 'checkbox') {

      if (!details.categories.includes(field)) {
        var clone = JSON.parse(JSON.stringify(details));
        clone.categories.push(field)
        setDetails(clone)
        //console.log('details set to ', clone)
        //var newDetails = Object.assign(details, clone)
      }

      else if (details.categories.includes(field)) {
        var clone = JSON.parse(JSON.stringify(details));
        var categories = clone.categories;
        const index = categories.indexOf(field)
        if (index > -1) {
          categories.splice(index, 1)
        }
        //console.log('categories is now ', categories);
        clone.categories = categories;
        setDetails(clone);
        //var newDetails = Object.assign(details, clone)
        //console.log('details are now set to ', details);
      }

  } else if(field.includes('.')) {
    var twoFields = splitFields(field)
          //var nestedProfileElement = splitFields(field, val);
    var nestedProfileElement = JSON.parse(`{"${twoFields[1]}": "${val}"}`); //{twitter: www.twitter.com}
    let trashDetails = details;
    let newFirstDot = Object.assign(details[twoFields[0]], nestedProfileElement) //trashdetails[social_media] = {twitter: www.twitter.com}
          //let nestedDetails = Object.assign(details, newFirstDot)
          //console.log('details was', details)
          //setDetails(nestedDetails);
          //console.log('dot-added ', nestedProfileElement, ' to ', details)
  } else {
    var profileElement = JSON.parse(`{"${field}": "${val}"}`);
    let newDetails = Object.assign(details, profileElement)
    setDetails(newDetails)
  }
}

var submit = function() {
  //console.log('submitting ', details) //DEBUG
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
  //use Adam's endpoint to populate
  axios.get(`http://localhost:3000/getUser?username=${props.username}`)
  .then((user) => {
    if (user.data.length > 0 && user.data[0] !== undefined) {
      //console.log('get request:', user.data[0]) //DEBUG
      setDetails(user.data[0])
    }

  })

}, [props.username]);



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>

      <Button onClick={handleOpen}>Edit Profile</Button>
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
              <tr><td>name: </td><td><input type='text' id='name' size='20' placeholder={details.name} onChange={saveText.bind(null,'name')}></input></td></tr>
              <tr><td>new password:  </td><td><input type='password' id='password' size='20' placeholder='' onChange={saveText.bind(null,'password')}></input></td></tr>

              {
                (details.is_performer)
                ? <tr><td>performer?</td><td><select id='is_performer' defaultValue='true' onChange={saveText.bind(null,'is_performer')} ><option value='true'>True</option><option value='false'>False</option></select></td></tr>
                : <tr><td>performer?</td><td><select id='is_performer' defaultValue='false' onChange={saveText.bind(null,'is_performer')} ><option value='true'>True</option><option value='false'>False</option></select></td></tr>
              }

              <tr><td>bio: </td><td><input type='text' id='bio' size='20' placeholder={details.bio} onChange={saveText.bind(null,'bio')}></input></td></tr>
              <tr><td>user_picture: </td><td><input type='text' id='user_picture' size='20' placeholder={details.user_picture} onChange={saveText.bind(null,'user_picture')}></input></td></tr>
              {
                (details.social_media)
                ? <tr><td>facebook link: </td><td><input type='text' id='social_media.facebook' size='20' placeholder={details.social_media.facebook} onChange={saveText.bind(null,'social_media.facebook')}></input></td></tr>
                : <tr><td>facebook link: </td><td><input type='text' id='social_media.facebook' size='20' placeholder='' onChange={saveText.bind(null,'social_media.facebook')}></input></td></tr>
              }
              {
                (details.social_media)
                ? <tr><td>instagram link: </td><td><input type='text' id='social_media.instagram' size='20' placeholder={details.social_media.instagram} onChange={saveText.bind(null,'social_media.instagram')}></input></td></tr>
                : <tr><td>instagram link: </td><td><input type='text' id='social_media.instagram' size='20' placeholder='' onChange={saveText.bind(null,'social_media.instagram')}></input></td></tr>
              }
              {
                (details.social_media)
                ? <tr><td>twitter link: </td><td><input type='text' id='social_media.twitter' size='20' placeholder={details.social_media.twitter} onChange={saveText.bind(null,'social_media.twitter')}></input></td></tr>
                : <tr><td>twitter link: </td><td><input type='text' id='social_media.twitter' size='20' placeholder='' onChange={saveText.bind(null,'social_media.twitter')}></input></td></tr>
              }

              <tr>
                <td>
                  categories:
                </td>
                <td>
                {/* <input type="checkbox" id="Music" name="music" onChange={saveText.bind(null,'Music')}></input> Music */}

                  {
                    (details.categories && details.categories.includes('Music'))
                    ? <input type="checkbox" checked={true} id="music" name="music" onChange={saveText.bind(null,'Music')}></input>
                    : <input type="checkbox" checked={false} id="music" name="music" onChange={saveText.bind(null,'Music')}></input>
                  }
                  Music<br></br>
                  {
                    (details.categories && details.categories.includes('Comedy'))
                    ? <input type="checkbox" checked={true} id="Comedy" name="Comedy" onChange={saveText.bind(null,'Comedy')}></input>
                    : <input type="checkbox" checked={false} id="Comedy" name="Comedy" onChange={saveText.bind(null,'Comedy')}></input>
                  }
                  Comedy<br></br>
                  {
                    (details.categories && details.categories.includes('Dance'))
                    ? <input type="checkbox" checked={true} id="Dance" name="Dance" onChange={saveText.bind(null,'Dance')}></input>
                    : <input type="checkbox" checked={false} id="Dance" name="Dance" onChange={saveText.bind(null,'Dance')}></input>
                  }
                  Dance<br></br>
                  {
                    (details.categories && details.categories.includes('Other'))
                    ? <input type="checkbox" checked={true} id="Other" name="Other" onChange={saveText.bind(null,'Other')}></input>
                    : <input type="checkbox" checked={false} id="Other" name="Other" onChange={saveText.bind(null,'Other')}></input>
                  }
                  Other<br></br>

                </td>
              </tr>


              {/* <tr><td>favorites: [] </td><td><input type='text' id='favorites' size='20' placeholder={details.favorites} onChange={saveText.bind(null,'favorites')}></input></td></tr> */}
              <tr><td>band: []</td><td><input type='text' id='band' size='20' placeholder={details.band} onChange={saveText.bind(null,'band')}></input></td></tr>
              <tr><td>media: []</td><td><input type='text' id='media' size='20' placeholder={details.media} onChange={saveText.bind(null,'media')}></input></td></tr>

            </tbody></table>
          </Typography>
          <Button onClick={submit} id='submit'>Submit</Button>
        </Box>
      </Modal>

    </div>
  )
}

