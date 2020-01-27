require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const foldersRouter = require('./folders/folders-router');
const noteRouter = require('./notes/notes-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
const allowedOrigins = ['https://bookmarks-app.evanjvogts.now.sh/'];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin - like mobile apps, curl, postman
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
            'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(helmet());

app.get('/', (req,res) => {
  res.send('Hello, world');
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  console.log('error');
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error);
    response = { message: error.message, error }
  }
  res.status(500).json(response);
});

app.use('/api/folders', foldersRouter);
app.use('/api/notes', noteRouter);

module.exports = app;