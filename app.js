'use strict';
const request = require('request');
const bodyParser = require('body-parser');
const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

var myLimit = typeof(process.argv[2]) != 'undefined' ? process.argv[2] : '100kb';
app.use(bodyParser.json({limit: myLimit}));
var serverData = {
    "hexagonData": [[], [], [], [], []],
    "nucleusData": [],
    "planetData": [],
    "barData": [],
};
app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        res.send();
    } else {
        for (let i = 0; i < serverData["hexagonData"].length; i++) {
          serverData["hexagonData"][i] = Array.from({length: 100},
            () => Math.random());
        }
        serverData["nucleusData"] = Array.from({length: 100}, () => Math.random());
        serverData["planetData"] = Array.from({length: 4}, () => Math.random());
        serverData["barData"] = Array.from({length: 1}, () => Math.random());

        res.send(serverData);
    }
});

module.exports = app;
