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

POST /signup
Description: Signup by providing username and password
Status:
  200 OK: Logged In
  403 User already Registered: User instructed to login

GET /signout
Description: Log out
Status:
  200 OK: User logged out