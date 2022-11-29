var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();
var myLimit = typeof(process.argv[2]) != 'undefined' ? process.argv[2] : '100kb';
app.use(bodyParser.json({limit: myLimit}));

app.all('/:account', function (req, res, next) {
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

app.listen(3000);