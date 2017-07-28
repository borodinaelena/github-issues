var express = require('express');
var app = express();
var server = require('http').createServer(app);
var request = require('request-promise');
let path = require('path');
let bodyParser = require('body-parser');
var Promise = require("bluebird");

var port = process.env.PORT || 3000;

require('./config/mongodb');
global.appDir = __dirname;


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(appDir, 'public')));


app.get('/hi', function (req, res) {
  return res.json({ message: 'Hi' });
});


app.get('/*', function (req, res) {
  res.sendFile(appDir + '/public/index.html');
});

