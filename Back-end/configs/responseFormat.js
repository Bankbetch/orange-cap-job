const moment = require('moment');
const log = require('./console.log');

module.exports = (req, res, next) => {
  res.success = (data = '', statusCode = 200) => {
    log(
      `${req.headers['x-forwarded-for'] || req.connection.remoteAddress} [${moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}] "${req.method} ${
        req.originalUrl
      }" ${statusCode}  - "Ratelimit ${res.getHeaders()['x-ratelimit-remaining']}" "${req.header('user-agent')}"`,
      'info'
    );
    res.status(statusCode || 200).send(data);
  };

  res.error = (error) => {
    log(
      `${req.headers['x-forwarded-for'] || req.connection.remoteAddress} [${moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}] "${req.method} ${
        req.originalUrl
      }" ${error.status}  - "Ratelimit ${res.getHeaders()['x-ratelimit-remaining']}" "${req.header('user-agent')}"`,
      'error'
    );
    res.status(error.status || 500).send(error);
  };

  next();
};
