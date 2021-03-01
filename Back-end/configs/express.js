const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const timeout = require('connect-timeout');
const rateLimit = require('express-rate-limit');
const { mongoDBHealthcheck } = require('./property');
const databases = require('./databases');
const middleware = require('./middleware');
const responseFormat = require('./responseFormat');
const fileUpload = require('express-fileupload');

module.exports = async (app) => {
  // secure
  app.use(helmet());

  // Connect MongoDB
  mongoDBHealthcheck();
  databases.mongoDB();

  // eslint-disable-next-line no-unused-expressions
  middleware;

  // CORS
  app.use(
    cors({
      origin: 'http://localhost:1234',
    })
  );

  // Parser Body
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Tomeout
  app.use(timeout('20s'));

  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      debug: true,
    })
  );

  // Latelimit
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many accounts created from this IP, please try again after an hour',
  });
  app.use(limiter);

  // Custom Response Format
  app.use(responseFormat);

  // Static file
  app.use('/static', express.static(path.join(__dirname, '../public')));
};
