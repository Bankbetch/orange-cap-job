const mongoose = require('mongoose');
const log = require('./console.log');
const config = require('./app');

const methods = {
  mongoDBHealthcheck() {
    // mongoDB()
    mongoose.connection.on('connected', () => {
      log(
        (`Mongoose default connection is open to ,${config.mongodbUri}`, 'ok')
      );
    });

    mongoose.connection.on('error', (err) => {
      log(`Mongoose default connection has occured: ${err} 1`, 'error');
    });

    mongoose.connection.on('disconnected', () => {
      log('Mongoose default connection is disconnected', 'error');
    });

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        log(
          'Mongoose default connection is disconnected due to application termination',
          'debug'
        );
        process.exit(0);
      });
    });
  },
};
module.exports = methods;
