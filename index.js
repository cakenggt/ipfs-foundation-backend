'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

const models = db.import(__dirname + '/models');

//sync all sequelize models
db.sync();

//parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Allow CORS http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//This tells the server to listen
var port = process.env.PORT;
http.listen(port, function(){
  console.log('Example app listening on port '+port+'!');
});

//This is the options object that will be passed to the api files
let apiOptions = {
  app: app,
  models: models
};

//Load the api versions
require('./api/v1')(apiOptions);
