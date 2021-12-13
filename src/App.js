import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import EditProfileModal from './profiles/editProfileModal.jsx';
import Profiles from './profiles/profiles.js';


export default function App() {

const [loggedInUser, setLoggedInUser] = useState();

  return (

      <div>
        <Profiles></Profiles>
      </div>

  )
}
