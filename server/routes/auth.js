const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  isAuthenticated,
} = require('../controllers/auth');
const authorization = require('../middlewares/authorization');

//TODO: Send back a longer expiration jwt in cookie and implement refresh token logic.

/**
 * Route handles registering a user and sending back an auth token.
 * @name post/register
 * @function
 * @memberof AuthRoutes
 * @param {string} path - Express Path
 * @param {callback}
 */
router.post('/register', registerUser);

/**
 * Route handles logging a user in and sending back an auth token.
 * @name post/login
 * @function
 * @memberof AuthRoutes
 * @param {string} path - Express Path
 * @param {callback}
 */
router.post('/login', loginUser);

/**
 * Route handles checking the authentication status of a user and sending back a boolean.
 * @function
 * @memberof AuthRoutes
 * @param {string} path - Express Path
 * @param {callback} - Authorization Middleware
 * @param {callback}
 */
router.get('/is-authenticated', authorization, isAuthenticated);

/**
 * Route handles sending back a refresh token to keep user signed in.
 * @function
 * @memberof AuthRoutes
 * @param {string} path - Express Path
 * @param {callback} - Refresh Token Middleware
 * @param {callback}
 */
// router.get('/refresh-token', refresh_token, refreshToken);

module.exports = router;
