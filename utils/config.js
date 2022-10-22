const secretTokenKey = 'secret-key';
const mongodbServer = 'mongodb://localhost:27017/moviesdb';
const port = 3000;

const jwtSettings = {
  expiresIn: '7d',
};

const cookieSettings = {
  httpOnly: true,
  sameSite: false,
  secure: true,
  maxAge: 3600000 * 24 * 7,
};

const corsSettings = {
  origin: [
    'http://markovproject.nomoredomains.sbs',
    'https://markovproject.nomoredomains.sbs',
    'http://praktikum.tk',
    'https://praktikum.tk',
    'http://localhost:3000',
  ],
  allowedHeaders: [
    'Content-Type',
    'Origin',
    'Referer',
    'Accept',
    'Authorization',
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

module.exports = {
  secretTokenKey,
  mongodbServer,
  port,
  jwtSettings,
  cookieSettings,
  corsSettings,
};
