const jwtDecode = require('jwt-decode');
const methods = {
  findUserId(req) {
    const getJwt = jwtDecode(req.headers['authorization'].split(' ')[1]);
    const user_id = getJwt.sub.split('|')[1];
    return user_id;
  },
};

module.exports = { ...methods };
