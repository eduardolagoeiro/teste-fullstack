const jwt = require('jsonwebtoken');

module.exports = function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      res.status(400)
      res.json({success:false, message: err.message});
    }else{
      req.body.userId = decoded.id;
      next();
    }
  });
}
