import axios from 'axios';

function addToPerformances(tagInfo) {
  axios.put('http://localhost:3000/updatePerformances', {
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

export {addToPerformances}