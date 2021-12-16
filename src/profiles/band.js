import React from 'react';
import { useState } from 'react';

export default function Band(props) {
  return (
      //add links to profile if they exist
    <div>
      {(props.user.band !== null && props.user.band) ?
        <div>
          <h3>{props.user.band.name}</h3>
          {props.user.band.members.map((member)=> {
            return (
              <p key={member}>{member}</p>
            )
        })}
        </div> : <div></div>}
   </div>
  )
}