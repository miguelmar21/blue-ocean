API Documentation

Summary

Auth Routes
  post /login
  post /signup
  get  /signout


Auth Routes

POST /login
Description: Log in by providing your username and password
Status:
  200 OK: Logged In
  403 Not Registered: User instructed to signup

  Parameter	Type	Description
  username	String	user's name that'll be used to login
  password	String	Secret String known only to user

  Request Body Example:
  {
    username: 'spaghetti',
    password: 'password'
  }

POST /signup
Description: Signup by providing username and password
Status:
  200 OK: Logged In
  403 User already Registered: User instructed to login

  Parameter	Type	Description
  username	String	user's name that'll be used to sign up
  password	String	Secret String known only to user

  Request Body Example:
  {
    username: 'spaghetti',
    password: 'password'
  }

GET /signout
Description: Log out
Status:
  200 OK: User logged out