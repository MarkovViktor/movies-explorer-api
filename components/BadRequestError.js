const { BADREQUEST_CODE } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BADREQUEST_CODE;
  }
}

module.exports = BadRequestError;
