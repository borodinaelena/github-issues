'use strict'

let express = require('express');
let router = express.Router();
let multer = require('multer');
let upload = multer({ dest: './public/uploads' });
let request = require('request');
let http = require('http');
let cookieParser = require('cookie-parser');
let passport = require('passport');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let moment = require('moment');

// let Auth = require('./../models/auth');
router.use('/social', require('./auth/index'));

router.get('/hi', function (req, res) {
  return res.json({ message: 'Hi' });
});

module.exports = router;
