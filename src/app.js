const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const logger = require('./logger');
require('dotenv').config();

const router = require('./route/index');

const app = express();

app.use(morgan('dev', {stream: logger.stream}));
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());
//Bind router-level middleware to app
app.use('/', router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //Include winston error
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.send('INTERNAL SERVER ERROR');
});

module.exports = app;
