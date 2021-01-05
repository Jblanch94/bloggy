const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwtGenerator = require('../utils/jwtGenerator');

async function registerUser(req, res) {
  try {
    //hash password
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    //insert user into database
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    //generate jwt with new user id
    const token = jwtGenerator({ user_id: newUser.id }, '15m');
    res.cookie('token', jwtGenerator({ user_id: newUser.id }, '20m'), {
      httpOnly: true,
    });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    //if user is empty send back error
    if (!user) {
      throw { message: 'Email does not exist!' };
    }

    //compare provided password with encrypted password
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //if passwords don't match then throw error to user
    if (!isValidPassword) {
      throw { message: 'Either email or password is incorrect!' };
    }

    //create a new token from the user id after everything passes
    const token = jwtGenerator({ user_id: user.id }, '1h');

    //send back token
    res.cookie('token', jwtGenerator({ user_id: newUser.id }, '20m'), {
      httpOnly: true,
    });
    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const isAuthenticated = (req, res) => {
  if (!req.user) {
    return res.status(403).send('Not Authorized');
  }

  res.send({ authenticated: true });
};

const refreshToken = (req, res) => {
  if (!req.user) {
    return res.send('Unauthorized');
  }

  const token = jwtGenerator({ user_id: req.user.user_id }, '15m');
  res.cookie('token', jwtGenerator({ user_id: req.user.user_id }, '20m'), {
    httpOnly: true,
  });
  res.send({ token });
};

module.exports = {
  registerUser,
  loginUser,
  isAuthenticated,
  refreshToken,
};
