'use strict';
const request = require('request');
const bodyParser = require('body-parser');
const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

var myLimit = typeof(process.argv[2]) != 'undefined' ? process.argv[2] : '100kb';
app.use(bodyParser.json({limit: myLimit}));

router.get('/:account', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        request({
                url: `https://api.opensea.io/user/${req.params.account}?format=json`, 
                headers: {'Authorization': req.header('Authorization')}
            },
            function (error, response, body) {
                if (error) {
                    console.error(error)
                }
            }).pipe(res);
    }
});

app.use(`/.netlify/functions/api`, router);

module.exports.handler = serverless(app);