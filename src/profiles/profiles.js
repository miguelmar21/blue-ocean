import React from 'react';
import { useState, useEffect } from 'react';
import Band from './band';
import Video from './videos';
import Search from './search';


//import components here


export default function Profiles(props) {

  const [user, setUser] = useState({user_picture: 'https://northaustinurology.com/app/uploads/2017/01/profile-silhouette.jpg',
  categories: [],
  name: '',
  username: 'Guest',
  band: {name: 'Three Amigos', members: [Adam, Miguel]},
  media: []});

  return (
    <div>
      <img className="profilePic" src={user.user_picture} width="100" height="100"/>
      <p>{`${user.name}, ${user.username}`}</p>
      {user.categories.map((type) => {
        //update map to include icons for different types of performers
        return (<p key={type}>{type}</p>)
      })}
      <p>{user.bio}</p>
      <Band user={user}/>
      <Video user={user}/>
      <Search/>
    </div>
  )
}

