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
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #ff0',
  boxShadow: 12,
  p: 4,
  borderRadius: 15
};

useEffect(() => {
  getUser()
}, [props.username] );

const [details, setDetails] = useState({username: props.username})
const [newMediaURL, setNewMediaURL] = useState('')
const [submitted, setSubmitted] = useState(false);
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

var convertToArrays = function(naiveDetails) {
  let betterDetails = naiveDetails;
  return betterDetails;
}

var setMedia = function(e) {
  var val = e.target.value;
  setNewMediaURL(val);
}

var addMedia = function() {
  var newMedia = details.media.slice();
  var improvedMediaURL = newMediaURL;
  if (improvedMediaURL.substring(0,17) === 'https://youtu.be/') {
    var yID = improvedMediaURL.substring(17, improvedMediaURL.length)
    improvedMediaURL = 'https://www.youtube.com/embed/' + yID;
  }
  newMedia.push(improvedMediaURL);
  var mediaObj = {media: newMedia}
  var clone = Object.assign(details, mediaObj)
  setDetails(clone)
  submit(true);
}

var deleteMedia = function(mediaIndex) {
  var newMedia = details.media.slice();
  newMedia.splice(mediaIndex)
  var mediaObj = {media: newMedia}
  var clone = Object.assign(details, mediaObj)
  submit(true);
}

var splitFields = function(twoFields, val) {
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
      }

      else if (details.categories.includes(field)) {
        var clone = JSON.parse(JSON.stringify(details));
        var categories = clone.categories;
        const index = categories.indexOf(field)
        if (index > -1) {
          categories.splice(index, 1)
        }
        clone.categories = categories;
        setDetails(clone);
      }

    } else if(field.includes('.')) {
      var twoFields = splitFields(field)
      var nestedProfileElement = JSON.parse(`{"${twoFields[1]}": "${val}"}`); //{twitter: www.twitter.com}
      let trashDetails = details;
      let newFirstDot = Object.assign(details[twoFields[0]], nestedProfileElement) //trashdetails[social_media] = {twitter: www.twitter.com}
    } else {
      var profileElement = JSON.parse(`{"${field}": "${val}"}`);
      let newDetails = Object.assign(details, profileElement)
      setDetails(newDetails)
    }

}

  var submit = function(closeOnSubmit) {
  let properlyStructuredDetails = convertToArrays(details);
  //update this to a PUT request after deployment works the first time
  axios.post('http://localhost:3000/updateUser', properlyStructuredDetails)
  .then((success)=> {
    setSubmitted(true);
    if(closeOnSubmit) {
      handleClose();
      getUser()
      .then(()=>{
        props.setUser(details)
      })
    }
  })
  .catch((err)=> {
    console.error('error!', err);
  })
}

var getUser = function() {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:3000/getUser?username=${props.username}`)
    .then((user) => {
      if (user.data.length > 0 && user.data[0] !== undefined) {
        setDetails(user.data[0])
        resolve(user.data[0])
      }
    })
    .catch((err) => {
      reject(err);
    })
  })
}


  return (
    <div>
      <Button onClick={handleOpen}>Edit Profile</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >


        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Profile
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }} component={'span'}>
            <table><tbody>
              <tr><td width='120'>name: </td><td><input type='text' id='name' size='60' placeholder={details.name} onChange={saveText.bind(null,'name')}></input></td></tr>
              {/* <tr><td>new password:  </td><td><input type='password' id='password' size='20' placeholder='' onChange={saveText.bind(null,'password')}></input></td></tr> */}

              {
                (details.is_performer)
                ? <tr><td>performer?</td><td><select id='is_performer' defaultValue='true' onChange={saveText.bind(null,'is_performer')} ><option key='true' value='true'>True</option><option key='false' value='false'>False</option></select></td></tr>
                : <tr><td>performer?</td><td><select id='is_performer' defaultValue='false' onChange={saveText.bind(null,'is_performer')} ><option value='true'>True</option><option value='false'>False</option></select></td></tr>
              }

              <tr><td>bio: </td><td><input type='text' id='bio' size='60' placeholder={details.bio} onChange={saveText.bind(null,'bio')}></input></td></tr>
              <tr><td>user_picture: </td><td><input type='text' id='user_picture' size='60' placeholder={details.user_picture} onChange={saveText.bind(null,'user_picture')}></input></td></tr>
              {
                (details.social_media)
                ? <tr><td>facebook link: </td><td><input type='text' id='social_media.facebook' size='60' placeholder={details.social_media.facebook} onChange={saveText.bind(null,'social_media.facebook')}></input></td></tr>
                : <tr><td>facebook link: </td><td><input type='text' id='social_media.facebook' size='60' placeholder='' onChange={saveText.bind(null,'social_media.facebook')}></input></td></tr>
              }
              {
                (details.social_media)
                ? <tr><td>instagram link: </td><td><input type='text' id='social_media.instagram' size='60' placeholder={details.social_media.instagram} onChange={saveText.bind(null,'social_media.instagram')}></input></td></tr>
                : <tr><td>instagram link: </td><td><input type='text' id='social_media.instagram' size='60' placeholder='' onChange={saveText.bind(null,'social_media.instagram')}></input></td></tr>
              }
              {
                (details.social_media)
                ? <tr><td>twitter link: </td><td><input type='text' id='social_media.twitter' size='60' placeholder={details.social_media.twitter} onChange={saveText.bind(null,'social_media.twitter')}></input></td></tr>
                : <tr><td>twitter link: </td><td><input type='text' id='social_media.twitter' size='60' placeholder='' onChange={saveText.bind(null,'social_media.twitter')}></input></td></tr>
              }

              <tr>
                <td>
                  categories:
                </td>
                <td>
                  {
                    (details.categories && details.categories.includes('Music'))
                    ? <input type="checkbox" checked={true} id="music" key='music' name="music" onChange={saveText.bind(null,'Music')}></input>
                    : <input type="checkbox" checked={false} id="music" key='music' name="music" onChange={saveText.bind(null,'Music')}></input>
                  }
                  &nbsp; Music<br></br>
                  {
                    (details.categories && details.categories.includes('Comedy'))
                    ? <input type="checkbox" checked={true} id="Comedy" key='comedy' name="Comedy" onChange={saveText.bind(null,'Comedy')}></input>
                    : <input type="checkbox" checked={false} id="Comedy" key='comedy' name="Comedy" onChange={saveText.bind(null,'Comedy')}></input>
                  }
                  &nbsp; Comedy<br></br>
                  {
                    (details.categories && details.categories.includes('Dance'))
                    ? <input type="checkbox" checked={true} id="Dance" key='dance' name="Dance" onChange={saveText.bind(null,'Dance')}></input>
                    : <input type="checkbox" checked={false} id="Dance" key='dance' name="Dance" onChange={saveText.bind(null,'Dance')}></input>
                  }
                  &nbsp; Dance<br></br>
                  {
                    (details.categories && details.categories.includes('Other'))
                    ? <input type="checkbox" checked={true} id="Other" key='other' name="Other" onChange={saveText.bind(null,'Other')}></input>
                    : <input type="checkbox" checked={false} id="Other" key='other' name="Other" onChange={saveText.bind(null,'Other')}></input>
                  }
                  &nbsp; Other<br></br>

                </td>
              </tr>


              <tr><td>media: </td><td>
                {
                  (Array.isArray(details.media))
                  ? details.media.map((medium, index) => {
                      return (
                        <div key={index}>
                        <input type='button' value='x' id={`media-${index}`} key={index} onClick={deleteMedia.bind(null, index)}></input> &nbsp; {
                        (medium.length > 50)
                        ? medium.substring(0, 30).concat(' ... '.concat(medium.substring(medium.length-30, medium.length)))
                        : medium
                        }
                        </div>
                      )
                    })
                  : null
                }
                <input type='button' id='media+' key='+' value='+' onClick={addMedia}></input> &nbsp;
                <input type='text' id='newMediaURLVal' key='nm+' size='56' placeholder='new media link' onChange={setMedia}></input>
              </td></tr>

            </tbody></table>
          </Typography>
          <Button onClick={submit.bind(null,true)} id='submit'>Submit</Button>
        </Box>
      </Modal>

    </div>
  )
}