const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { patchUserValidator } = require('../middlewares/validation');

router.route('/me')
  .get(getUser)
  .patch(patchUserValidator, updateUser);

module.exports = router;
