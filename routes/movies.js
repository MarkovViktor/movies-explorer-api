const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { idValidator, movieValidator } = require('../middlewares/validation');

router.route('/')
  .get(getMovies)
  .post(movieValidator, createMovie);

router.delete('/:_id', idValidator, deleteMovie);

module.exports = router;
