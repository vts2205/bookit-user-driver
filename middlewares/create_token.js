var jwt = require('jsonwebtoken');


exports.getToken = function (payload, accessToken) {
   return jwt.sign(payload, accessToken)
}