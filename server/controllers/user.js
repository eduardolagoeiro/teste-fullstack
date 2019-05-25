const userModel = require('../models/user');

function signup(req, res, next) {
  userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    birthday: req.body.birthday,
  }, (err, result) => {
    if(err) next(err);
    else {
      res.json({
        success: true,
        message: 'User created!',
        user: {
          name: result.name,
          email: result.email,
          birthday: result.birthday,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt
        }
      })
    }
  });
}

module.exports = {
  signup
}