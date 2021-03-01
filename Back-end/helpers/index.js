const auth = require('./auth');
const handleMessage = require('./handleMessage.helper');

module.exports = { ...handleMessage, ...auth };
