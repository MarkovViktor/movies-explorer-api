const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const celebrate = require('celebrate');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const routes = require('./routes');
const handleError = require('./components/handleError');
const limiter = require('./middlewares/rateLimiter');
const { mongodbServer, port, corsSettings } = require('./utils/config');

const { PORT = port, MONGOD_SERVER = mongodbServer } = process.env;

const app = express();

mongoose.connect(MONGOD_SERVER);
app.listen(PORT);

app.use(requestLogger);
app.use(limiter);

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('*', cors(corsSettings));

app.use(routes);

app.use(errorLogger);
app.use(celebrate.errors());
app.use(handleError);
