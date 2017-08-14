'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let bcrypt = require('bcryptjs');
let moment = require('moment');
let jwt = require('jsonwebtoken');
let http = require('http');
var request = require('request');
const githubController = require('./github.controller');
var Promise = require("bluebird");
let User = require('./../../models/users');
var GitHubApi = require("github");

router.get('/orgs/:param', function (req, res) {

  console.log(req.params.param)

  User.findOne({ _id: req.params.param })
    .then((user) => {
      console.log('user', user);
      // var github = new GitHubApi({
      //   version: "3.0.0"
      // });
      // github.authenticate({
      //   type: "token",
      //   token: user.token,
      // });
      // github.orgs.getForUser({ username: user.login },
      //   function (err, orgs) {
      //     console.log(orgs);
      //     console.log(err);
      //     return res.json({
      //       success: true,
      //       data: { orgs: orgs },
      //       errors: []
      //     });
      //   })

      return githubController.getOrgsForUser(user.token, user.login)
    })
    .then((orgs) => {
      console.log('orgs', orgs);
      res.json({
        success: true,
        data: { orgs: orgs },
        errors: []
      });

    })
    .catch((err) => {
      console.log('err', err.message)
      return errorHandler(req, res, [err.message])
    })

})

router.get('/repos/:param', function (req, res) {
  console.log(req.params.param)
  User.findOne({ _id: req.params.param })
    .then((user) => {
      return githubController.getReposForUser(user.token, user.login)
    })
    .then((repos) => {
      res.json({
        success: true,
        data: { repos: repos },
        errors: []
      });
    })
    .catch((err) => {
      console.log('err', err.message)
      return errorHandler(req, res, [err.message])
    })
})

router.get('/issues/one/:fullname/:userId', function (req, res) {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      return githubController.getIssuesForRepo(user.token, req.params.fullname)
    })
    .then((issues) => {
      res.json({
        success: true,
        data: { issues: issues },
        errors: []
      });
    })
    .catch((err) => {
      console.log('err', err.message)
      return errorHandler(req, res, [err.message])
    })
})

router.get('/issues/all/:fullname/:userId', function (req, res) {
  var token;
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      token = user.token;
      return githubController.getReposForUser(token, user.login);
    })
    .then(function (repos) {
      return Promise.map(repos, function (repo) {
        return githubController.getIssuesForRepo(token, repo.full_name);
      }).then(function (issues) {
        res.json({
          success: true,
          data: { issues: issues },
          errors: []
        });
      })
    })
    .catch(function (err) {
      console.log(err);
      return res.json({ error: err });
    });
})

function errorHandler(req, res, errors) {
  return res.status(404).json({
    success: false,
    errors: errors
  });
}





module.exports = router;