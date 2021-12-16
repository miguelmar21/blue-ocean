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
  password1: '',
  password2: ''
}

var Signup = ({ setLoggedInUser, display, setDisplay }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

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
    if ('password1' in formValues) {
      temp.password1 = formValues.password1 ? "" : "This is a required Field";
    }
    if ('password2' in formValues) {
      if (!formValues.password2) {
        temp.password2 = "This is a required Field";
      } else {
        temp.password2 = formValues.password2 === values.password1 ? "" : "Passwords must match.";
      }
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

      axios
        .post(`http://localhost:3000/signup`, { username: values.username, password: values.password1})
        .then(({data}) => {

          let user = data;
          setLoggedInUser(user);
          setUsername(user.username);
          setDisplay('Logout');
          handleClose();
          reset();
        })
        .catch(err => {
          setError('You already have an account. Please login.');
        })
    }
  }

  return (
    <div className="aq">
      <Button
        text="Signup"
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
          {error &&
            <Typography id="modal-modal-title" component="h2" color="error">
              {error}
            </Typography>}
          <Input
            label="Enter your username"
            name="username"
            value={values.username}
            onChange={handleChange}
            error={errors.username}
          />
          <Input
            label="Enter your password."
            name="password1"
            value={values.password1}
            type="password"
            onChange={handleChange}
            error={errors.password1}
          />
          <Input
            label="Re-enter your password."
            name="password2"
            value={values.password2}
            type="password"
            onChange={handleChange}
            error={errors.password2}
          />
          <Stack direction="row" spacing={2}>
            <Button
              text="Signup"
              type="submit"
              onClick={handleSubmit}
            />
          </Stack>
        </TemplateForm>
      </Modal>
    </div>
  )
}

export default Signup;