'use strict';

let mongoose = require('mongoose');
let User = require('./../../models/users');
let bodyParser = require('body-parser');
let bcrypt = require('bcryptjs');

function errorHandler(req, res, errors) {
  return res.status(404).json({
    success: false,
    errors
  });
}
module.exports = {
  getAllUsers: function (req, res) {
    User.find({})
      .then((users) => {
        res.json({
          success: true,
          data: { users: users },
          errors: []
        });
      })
      .catch((err) => {
        return errorHandler(req, res, ['Cannot find'])
      })
  },
  getOneUser: function (req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        res.json({
          success: true,
          data: { user: user },
          errors: []
        });
      })
      .catch((err) => {
        return errorHandler(req, res, ['Cannot find'])
      })
  },
  addUser: function (req, res) {
    User.create(req.body)
      .then(function (user) {
        res.json({
          success: true,
          data: { user: user },
          errors: []
        });
      })
      .catch(function (err) {
        return errorHandler(req, res, ['Cannot add'])

      });

  },
  updateUser: function (req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(function (user) {
        res.json({
          success: true,
          data: { user: user },
          errors: []
        });
      })
      .catch(function (err) {
        console.error(err);
        return errorHandler(req, res, ['Cannot update'])
      });

  },
  deleteUser: function (req, res) {
    User.remove({ _id: req.params.id })
      .then(function (user) {
        res.json({
          success: true,
          data: { user: user },
          errors: []
        });
      })
      .catch(function (err) {
        return errorHandler(req, res, ['Cannot delete']);
      });

  }
}
