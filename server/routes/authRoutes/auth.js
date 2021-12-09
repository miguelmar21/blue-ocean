
const auth = (req, res, next) => {
  let authHeader = req.headers.authorization;
  console.log(req.headers);
  if(!authHeader) {
    let err = new Error("You're not authenticated!");
    res.setHeader('WWW-Authenticate', 'basic');
    err.status = 401;
    return next(err);
  }

  let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
  let username = auth[0], password = auth[1];
  let authenticated = username === 'admin' && password === 'password';
  let err = new Error("Username and/or password invalid!");
  err.status = 401;
  authenticated ? next() : next(err);
}

// sample authorization: 'Basic YWRtaW46cGFzc3dvcmQ='
//authorization in headers is encoded in base64
// so you have to decode it in the buffer, the convert the buffer to a string of form username: password, then split the string to isolate username and password at ':'.

module.exports = auth;