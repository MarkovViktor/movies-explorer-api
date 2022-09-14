const Movie = require('../models/movie');
const ForbiddenError = require('../components/ForbiddenError');
const NotFoundError = require('../components/NotFoundError');
const { NODATAFOUND_MSG, CANTDELETEFILM_MSG, MOVIEDELETED_MSG } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  req.body.owner = req.user._id;

  Movie.create(req.body)
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NODATAFOUND_MSG);
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(CANTDELETEFILM_MSG);
      }

      return movie.remove()
        .then(() => res.send({ message: MOVIEDELETED_MSG }));
    })
    .catch(next);
};
