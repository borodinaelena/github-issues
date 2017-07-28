'use strict'

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let bcrypt = require('bcryptjs');


module.exports = {
  getGithubAuth: function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    // var email = profile.id + "@github";
    // Client.findOne({ githubId: profile.id }, function (err, user) {
    //   if (user) {
    //     console.log(err);
    //     return done(err, user);
    //   } else {
    //     console.log('else');
    //     let newUser = {
    //       email: email,
    //       password: profile.id ,
    //       type: 0,
    //     }
    //     Auth.create(newUser)
    //       .then(function (authClient) {
    //         let newUser = {
    //           name: profile._json.login,
    //           address: 'Не указан',
    //           phone: 'Не указан',
    //           discount: 0,
    //           authId: authClient._id,
    //           order: null,
    //           githubId: profile.id
    //         }
    //         Client.create(newUser)
    //           .then(function (user) {
    //             err = null;
    //             return done(err, user);
    //           });
    //       });
    //   }
    // });
  }
}
