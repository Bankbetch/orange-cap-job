const log = require('log-beautify');

module.exports = (message, type) => {
  log.setSymbols({
    success: '✅ ',
    info: 'ℹ️ ',
  });
  switch (type) {
    case 'trace':
      log.trace(message);
      break;
    case 'success':
      log.success(message);
      break;
    case 'error':
      log.error(message);
      break;
    case 'info':
      log.info(message);
      break;
    case 'debug':
      log.info(message);
      break;
    case 'ok':
      log.info(message);
      break;
    default:
      break;
  }
};
