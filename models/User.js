const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const saltRounds = 5;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 30,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  imageURL: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    required: false,
  },
  joinDate: {
    type: Date,
    required: true,
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Recipe',
  },
});

UserSchema.pre('save', function(next) {
  var user = this; //"this" inside of a pre-save hook is the document that is about to be saved

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByToken = function(token, cb) {
  var user = this;

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    //"decoded" is based on token = jwt.sign(user._id.toHexString(),process.env.TOKEN)
    //"decoded" is the original payload(user._id) without the privateKey(process.env.TOKEN)
    user.findOne({ _id: decoded, token: token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
