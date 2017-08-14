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

let GithubController = require('./github.auth.controller');
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
  clientID: '35369240b37657fba828',
  clientSecret: '4344fbe76ae5c17b6ae64a4237c765a53ed4b816',
}, GithubController.getGithubAuth
));

router.get('/auth/github',
  passport.authenticate('github', { scope: [
    'read:org',
    'admin:org' ,
    'public_repo', 
  ]}));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/forbidden' }),
  function (req, res) {
    res.redirect('/auth/success')
  });


module.exports = router;