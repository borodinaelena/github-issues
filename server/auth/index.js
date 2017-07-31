'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let bcrypt = require('bcryptjs');
let moment = require('moment');
let jwt = require('jsonwebtoken');
let passport = require('passport');
let GitHubStrategy = require('passport-github2');
let http = require('http');
var request = require('request');

let GithubController = require('./github.controller');
// let FacebookController = require('./facebook.controller');
let UserController = require('./user.controller');

router.get('/all', UserController.getAllUsers);
router.get('/one/:id', UserController.getOneUser);
router.post('/add', UserController.addUser);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new GitHubStrategy({
  clientID: '652c14e74cd1be1b0baa',
  clientSecret: '88605e335aae03374fe3b009eed888eb7cd7545c',
},GithubController.getGithubAuth
));

router.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/forbidden' }),
  function (req, res) {
    let expiry = moment().unix() + 3600;
    var token = jwt.sign({ _id: req.user._id, exp: expiry, type: 0 }, "token");
    console.log('token', token);
    res.cookie('token', token);
    res.redirect('/auth/success')
  });


module.exports = router;