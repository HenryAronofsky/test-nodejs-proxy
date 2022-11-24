var path = require('path');
const request = require('request');
var express = require('express');
var app = express();
var fs = require("fs");

app.get('/', function (req, res) {
  request('https://api.opensea.io/user/0x4f0e1AfCEfd307ef0f306959c970Fe96839349Bc?format=json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log( body );
      res.end( body );
    }
  });
})

app.listen(8081)
