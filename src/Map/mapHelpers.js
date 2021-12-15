import axios from 'axios';

function addToPerformances(tagInfo) {
  axios.post('http://localhost:3000/updatePerformances', {
    username: tagInfo.username,
    location: tagInfo.location,
    time: tagInfo.time,
    category: tagInfo.category,
    additionalPerformers: null
  })
  .then((response) => {
    console.log('added!')
  })
  .catch((error) => {
    console.log(error)
  })
}

function deletePerformance(tagInfo) {
  axios.patch('http://localhost:3000/updatePerformances', {
    username: 'Miguelito',
    lat: tagInfo.lat,
    lng: tagInfo.lng
    //May not be the best way to delete a performance, 
    //but for mvp it will do.
  })
  .then(response => {
    console.log('patched!')
  })
  .catch(error => {
    console.log(error)
  })
}

export {addToPerformances, deletePerformance}