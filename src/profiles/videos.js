import React from 'react';
import { useState } from 'react';

export default function Video(props) {
  return (
    props.user.media.map((video, index)=> {
      console.log(video)
      return(
      <object key={index} data={video} width='560px' height='315px'></object>
      )
    })
  )
}