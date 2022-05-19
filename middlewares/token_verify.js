const { decode } = require('json-web-token');
var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  var headers = req.headers['authorization'];
  var token = headers && headers.split(' ')[1]
  if (token === null)
    return res.status(401).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, process.env.ACCESS_KEY, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    console.log('}}}}}}}}}}}}}}}}}}}}}}}}}}}}}')
    console.log(decoded)
    req.contact = decoded;
    next();
  });
}

module.exports = verifyToken;