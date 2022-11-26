const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretTokenKey, jwtSettings, cookieSettings } = require('../utils/config');
const { EMAILREGISTERED_MSG, SUCCESSFULLOGIN_MSG, SUCCESSFULEXIT_MSG } = require('../utils/constants');
const ConflictError = require('../components/ConflictError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(EMAILREGISTERED_MSG));
      } else {
        next(err);
      }
    });
};

module.exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash })
      .then((user) => {
        const newUser = user.toObject();
        delete newUser.password;
        res.send(newUser);
      }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(EMAILREGISTERED_MSG));
      } else {
        next(err);
      }
    });
};

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV !== 'production' ? secretTokenKey : JWT_SECRET,
        jwtSettings,
      );

      res
        .cookie('jwt', token, cookieSettings)
        .send({ message: SUCCESSFULLOGIN_MSG });
    })
    .catch(next);
};

module.exports.signout = (req, res, next) => {
  res
    .clearCookie('jwt')
    .send({ message: SUCCESSFULEXIT_MSG })
    .catch(next);
};
