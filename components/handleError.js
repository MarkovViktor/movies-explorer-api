const {
  DEFAULT_CODE,
  DEFAULT_MSG,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = DEFAULT_CODE, message = DEFAULT_MSG } = err;
  res.status(statusCode).send({ message });
  next();
};
