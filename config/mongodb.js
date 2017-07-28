"use strict"

let mongoose = require('mongoose');

// Init mongoose
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/github_issues');
