'use strict'

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let bcrypt = require('bcryptjs');

let User = require('./../../models/users');


module.exports = {
  getGithubAuth: function (accessToken, refreshToken, profile, done) {
    console.log(profile._json)
    User.findOne({ githubId: profile.id }, function (err, user) {
      if (user) {
        console.log(err);
        return done(err, user);
      } else {
        let newUser = {
          login: profile._json.login,
          token: accessToken,
          githubId: profile.id
        }
        console.log(newUser)
        User.create(newUser)
          .then(function (user) {
            err = null;
            return done(err, user);
          });
      }
    });
  }
}
