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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(appDir, 'public')));

app.use('/api/', require('./server/index'));



app.get('/hi', function (req, res) {
  return res.json({ message: 'Hi' });
});


app.get('/*', function (req, res) {
  res.sendFile(appDir + '/public/index.html');
});

module.exports = app;