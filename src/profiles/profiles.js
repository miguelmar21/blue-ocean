import React from 'react';
import { useState, useEffect } from 'react';
import Band from './band';
import Video from './videos';

//import components here


export default function Profiles() {

  const [user, setUser] = useState({
    username: 'BuskALennon',
    is_performer: true,
    name:'John Lennon',
    bio: 'An English singer, songwriter, musician and peace activist who achieved worldwide fame as the founder, co-songwriter, co-lead vocalist and rhythm guitarist of the Beatles.',
    user_picture: 'https://upload.wikimedia.org/wikipedia/commons/8/85/John_Lennon_1969_%28cropped%29.jpg',
    social_media: ['https://www.facebook.com/johnlennon'],
    categories: ['Singer', 'Guitarist'],
    favorites: [],
    band: {name: 'The Beatles', members:['Paul McCartney', 'Ringo Starr', 'George Harrison']},
    media: ['https://www.youtube.com/embed/WHCnTP9Bels'],
    performances: [{}],
    });

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

    </div>
  )
}

