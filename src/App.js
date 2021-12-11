import React from 'react';
import axios from 'axios';
import { useState } from 'react';

import EditProfileModal from './profiles/editProfileModal.jsx';

export default function App()  {

  const [loggedInUser, setLoggedInUser] = useState();

  return (
      <div>
        <EditProfileModal username='Miguelito' />
      </div>
  )
};

