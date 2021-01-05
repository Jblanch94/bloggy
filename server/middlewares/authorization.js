const jwt = require('jsonwebtoken');
const keys = require('../config/devKeys');

const authorization = (req, res, next) => {
  try {
    //get the token from the authorization header
    const token = req['headers'].authorization.split(' ')[1];

    //if no token is provided then send back not authorized
    if (!token) {
      throw { message: 'Not Authorized!' };
    }

    //verify the token is valid
    const decoded = jwt.verify(token, keys.jwt_secret);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = authorization;
