
// using sessions with database
// check if req has a session.user
// if has no session.user, then not authenticated
// if it has session.user check if it's authenticated
// if not authenticated
// then error
// if authenticated then next()

const auth = (req, res, next) => {
  if(!req.session.user) {
    let err = new Error('You are not logged in!')
    err.status = 401;
    return next(err);
  }
  else{
    if(req.session.user === 'authenticated') {
      next();
    } else {
      let err = new Error('You are not logged in!')
      err.status = 401;
      return next(err);
    }

  }
}

// sample authorization: 'Basic YWRtaW46cGFzc3dvcmQ='
//authorization in headers is encoded in base64
// so you have to decode it in the buffer, the convert the buffer to a string of form username: password, then split the string to isolate username and password at ':'.

module.exports = auth;