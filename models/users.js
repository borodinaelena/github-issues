'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usersShema = new Schema({
  login: String,
  token: String,
  githubId: String,
});

module.exports = mongoose.model('Users', usersShema);


