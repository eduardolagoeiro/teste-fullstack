const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'cannot be blank']
  },
  email: {
    type: String,
    required: [true, 'cannot be blank'],
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  birthday: Date
}, {timestamps: true});

UserSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
})

UserSchema.plugin(uniqueValidator, {message: 'already taken.'});

module.exports = mongoose.model('User', UserSchema);