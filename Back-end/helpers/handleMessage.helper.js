const methods = {
  errorHandle(message, status = 500) {
    const error = {};
    error.success = false;
    error.status = status;
    error.message = message;
    error.result = null;
    return error;
  },
  successHandle(data = null, message = null) {
    const success = {};
    success.success = true;
    success.status = 200;
    success.message = message;
    success.result = data;
    return success;
  },
  errorMongo({ code, keyValue, message }) {
    if (code === 11000 || code === '11000')
      return `${Object.keys(keyValue)}: ${Object.values(
        keyValue
      )} already in the system.`;
    return message;
  },
};

module.exports = { ...methods };
