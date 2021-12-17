import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = props => {
  const {
    text,
    color,
    variant,
    size,
    onClick = null,
    underline = null,
    ...others
  } = props;

  return (
    <MuiButton
      color={color || "primary"}
      variant={variant || "text"}
      size={size || "large"}
      onClick={onClick}
      {...others}
    >
      {underline ? <u>{text}</u> : text}
    </MuiButton>
  )

};

export default Button;