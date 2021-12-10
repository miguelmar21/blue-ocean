

// using cookies
// check to see if has signed cookies
// if it doesn't, challenge for username password
// if correct, sign cookes and prompt client to setup cookie on client side for future requests
// else send to error path
// if has signed cookies
// checked if signed cookies username equal
// to admin
// else send error path

const auth = (req, res, next) => {

  if(!req.session.user) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      let err = new Error("You're not authenticated");
      err.status = 401;
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
    let auth =  new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':')
    let username = auth[0], password = auth[1];

    let authenticated = username === 'admin' && password === 'password';
    let err = new Error('Wrong username and/or password');
    err.status = 401;
    if(authenticated) {
      req.session.user = 'admin';//note that with cookies, you setup the cookie and add it to the response, but with sessions, you add the user to the session property on the request
      return next();
    }
    res.setHeader('WWW-Authenticate', 'Basic');
    return next(err);
  } else {
    if(req.session.user === 'admin') {
      return next();
    }
    let err = new Error("Invalid login credentials");
    err.status = 401;
    err.status = 401;
    return next(err);
  }
}

// sample authorization: 'Basic YWRtaW46cGFzc3dvcmQ='
//authorization in headers is encoded in base64
// so you have to decode it in the buffer, the convert the buffer to a string of form username: password, then split the string to isolate username and password at ':'.

module.exports = auth;