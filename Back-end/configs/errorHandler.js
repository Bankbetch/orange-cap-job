const { errorHandle } = require('../helpers/index');

module.exports = (isProduction = false, app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(errorHandle('Endpoint Not Found', 404));
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (!isProduction) console.log(err.stack);
    const statusCode = err.status || err.statusCode || 500;
    res.status(statusCode);
    res.json(errorHandle(err.message, statusCode));
  });
};
