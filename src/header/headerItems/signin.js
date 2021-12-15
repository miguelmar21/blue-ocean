import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '../button';
import { useForm, TemplateForm } from '../form';
import Input from '../input';
import axios from 'axios';
import Stack from '@mui/material/Stack';

const initialValues = {
  username: '',
  password: '',
}

var Login = ({ setLoggedInUser}) => {
  const [open, setOpen] = useState(false);

  var handleOpen = () => {
    reset();
    setOpen(true);
  };
  var handleClose = () => { setOpen(false) };

  const validate = (formValues = values) => {

    const temp = { ...errors };

    if ('username' in formValues) {
      if (!formValues.username) {
        temp.username = "This is a required Field";
      }
      // else {
      //   temp.username = (/$^|.+@.+..+/).test(formValues.username) ? "" : "Email is not valid.";
      // }
    }
    if ('password' in formValues) {
      temp.password = formValues.password ? "" : "This is a required Field";
    }



    setErrors({
      ...temp
    })

    if (formValues === values) return Object.values(temp).every(error => error === '');
  }

  const {
    values,
    handleChange,
    errors,
    setErrors,
    reset
  } = useForm(initialValues, validate, true);

  const handleSubmit = () => {
    let noErrors = validate();
    if (noErrors) {
      // handle username existing in
      // database already
      handleClose();
      reset();
      axios
        .post(`http://localhost:3000/login`, { username: values.username, password: values.password })
        .then(response => {
          // handleClose();
          // reset();
          let user = response.data;
          setLoggedInUser(user);
        })
        .catch(err => {
          // setErrors({
          //   ...temp,
          //   'username': 'Email already has account. Please login.'
          // })
        })
    }
  }

  return (
    <div className="aq">
      <Button
        text="Login"
        variant="outlined"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <TemplateForm>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter your username and password.
          </Typography>
          <Input
            label="Enter your Username?"
            name="username"
            value={values.username}
            onChange={handleChange}
            error={errors.username}
          />
          <Input
            label="Enter your password."
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Stack direction="row" spacing={2}>
            <Button
              text="Login"
              type="submit"
              onClick={handleSubmit}
            />
          </Stack>
        </TemplateForm>
      </Modal>
    </div>
  )
}

export default Login;