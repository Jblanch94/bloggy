const jwt = require('jsonwebtoken');
const keys = require('../config/devKeys');

const refreshToken = (req, res, next) => {
  try {
    //get token from cookie
    const { token } = req.cookies;

    if (!token) {
      throw { message: 'Unauthorized!' };
    }

    //verify the token
    const decoded = jwt.verify(token, keys.jwt_secret);

    if (!decoded) {
      throw { message: 'Unauthorized!' };
    }

    req.user = decoded;

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = refreshToken;
