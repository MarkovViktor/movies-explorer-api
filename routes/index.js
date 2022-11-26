const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const NotFoundError = require('../components/NotFoundError');
const { signup, signin, signout } = require('../controllers/users');
const { signupValidator, signinValidator } = require('../middlewares/validation');
const { INVALIDPATH_MSG, WELCOME_MSG } = require('../utils/constants');
const auth = require('../middlewares/auth');

router.get('/', (req, res) => res.send({ message: WELCOME_MSG }));
router.post('/signup', signupValidator, signup);
router.post('/signin', signinValidator, signin);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);
router.post('/signout', signout);

router.use('*', () => {
  throw new NotFoundError(INVALIDPATH_MSG);
});

module.exports = router;
