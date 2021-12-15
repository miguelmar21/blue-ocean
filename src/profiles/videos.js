import React, { useState } from 'react';
import { Carousel } from '3d-react-carousal';

export default function Video(props) {
  let slides = [];
  for (let video of props.user.media) {
    slides.push(<object data={video} width='560px' height='315px'></object>);
  }

  return (
    <Carousel slides={slides}/>
  )
}