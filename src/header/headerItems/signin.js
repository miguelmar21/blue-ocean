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

const style = {
  '& .css-xlxjzz-MuiStack-root': {
    height: '37%',
  },
}

var Login = ({ username, setUsername,setLoggedInUser, display, setDisplay}) => {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState('');
  useEffect(() => {}, [display]);

  var handleOpen = () => {
    if(display === 'Login') {
      reset();
      setOpen(true);
    } else {
      axios
        .get(`http://localhost:3000/signout`, { username})
        .then(response => {
          setDisplay('Login');
          setUsername('');
          setError('');
          setLoggedInUser({
            user_picture: 'https://northaustinurology.com/app/uploads/2017/01/profile-silhouette.jpg',
            categories: [],
            name: '',
            username: 'Guest',
            band: { name: '', members: [] },
            media: [],
            favorites: []
          });
        })
        .catch(err => {
          console.log(err)
        })
    }
  };
  var handleClose = () => { setOpen(false) };

  const validate = (formValues = values) => {

    const temp = { ...errors };

    if ('username' in formValues) {
      temp.username = !formValues.username ? "This is a required Field" : "";
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


  const handleSubmit = (e) => {
    e.preventDefault();
    let noErrors = validate();
    if (noErrors) {

      e.preventDefault();
      axios
      .post(`http://localhost:3000/login`, { username: values.username, password: values.password })
      .then(({data}) => {
          let user = data;
          setLoggedInUser(user);
          setUsername(user.username);
          setDisplay('Logout');
          handleClose();
          reset();
        })
        .catch(err => {
          setError('Invalid username or password');
        })
    }
  }

  return (
    <div className="aq">
      <Button
        text={display}
        variant="outlined"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" sx={style}>
        <TemplateForm >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter your username and password.
          </Typography>
          {error &&
          <Typography id="modal-modal-title"  component="h2" color="error">
            {error}
          </Typography>}
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
              onClick={handleSubmit}
            />
          </Stack>
        </TemplateForm>
      </Modal>
    </div>
  )
}

export default Login;