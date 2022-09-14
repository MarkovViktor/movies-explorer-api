const { NOTFOUND_CODE } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statuCode = NOTFOUND_CODE;
  }
}

module.exports = NotFoundError;
