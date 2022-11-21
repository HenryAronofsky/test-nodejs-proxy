var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
const request = require('request');

request('https://www.npmjs.com/package/request', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

app.get('/', function (req, res) {
    res.send("JSON.parse(data)");
});

app.listen(3001);
