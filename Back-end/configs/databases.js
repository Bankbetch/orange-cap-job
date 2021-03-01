const mongoose = require('mongoose');
const config = require('./app');
const log = require('./console.log');

const databases = {
  mongoDB() {
    const db = mongoose.connect(
      config.mongodbUri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        authSource: 'admin',
        readPreference: 'primary',
      },
      (error) => {
        if (error) {
          log('MongoDB error', 'error');
          console.error(error);
        } else {
          log('MongoDB connected', 'success');
        }
      }
    );
    mongoose.set('debug', false);
    return db;
  },

  redis() {},

  postgresql() {},

  mssql() {},
};

module.exports = databases;
