const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

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

function signin(req, res, next) {
  userModel.findOne({email:req.body.email}, (err, user) => {
    if (err) next(err);
    else if (user != null) {
      bcrypt.compare(req.body.password, user.password, (err, same) => {
        if (err) next(err);
        if(same){
          const token = jwt.sign({id: user._id}, req.app.get('secretKey'), {expiresIn:'6h'});
          res.json({success: true, data:{user: {
            name: user.name,
            email: user.email,
            birthday: user.birthday
          }, token:token}});
        }
        else res.status(401).json({success: false, message: "Invalid email or password"});
      })
    } else res.status(404).json({success: false, message: "Account not found"});
  });
}

function getUser(req, res, next) {
  userModel.findById(req.body.userId, (err, user) => {
    if(err) res.status(400).json({success: false, message: err});
    else if (!user) res.status(404).json({success: false, message: 'User not found.'});
    else res.json({
      name: user.name,
      email: user.email,
      birthday: user.birthday
    });
  })
}

function updateUser(req, res, next) {
  if(req.body.password){
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  }
  userModel.findByIdAndUpdate(req.body.userId, req.body, {new: true}, (err, user) => {
    if(err) res.status(400).json({success: false, message: err});
    else if (!user) res.status(404).json({success: false, message: 'User not found.'});
    else res.json({
      name: user.name,
      email: user.email,
      birthday: user.birthday
    });
  }) 
}

function deleteUser(req, res, next) {
  userModel.findByIdAndRemove(req.body.userId, (err, user) => {
    if(err) res.status(400).json({success: false, message: err});
    else if (!user) res.status(404).json({success: false, message: 'User not found.'});
    else res.json({success: true, message:'User removed.'});
  })
}

module.exports = {
  signup,
  signin,
  getUser,
  updateUser,
  deleteUser
}