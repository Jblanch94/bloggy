const jwt = require('jsonwebtoken');
const keys = require('../config/devKeys');

module.exports = function (data, duration) {
  return jwt.sign(data, keys.jwt_secret, { expiresIn: duration });
};
