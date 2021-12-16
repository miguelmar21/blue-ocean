module.exports = (req, res, next) => {
  let err = new Error('Please login to access this resource');
  err.status = 403;
  req.user ? next() : next(err);
};