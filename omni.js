'use strict';

let fs = require('fs'),
    colors = require('colors'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    https = require('https'),
    http = require('http'),
    Twitter = require('twitter'),
    request = require('request'),
    querystring = require('querystring'),
    cookieParser = require('cookie-parser'),
    Client = require('node-rest-client').Client;

var client = new Client();

app.use(express.static('657'))
app.use(cookieParser());

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {

    console.log('\n');
    console.log('********************************************'.black.bgWhite);
    console.log("The frontend server is running on port 5000!".black.bgWhite);
    console.log('********************************************'.black.bgWhite);
    console.log('\n');

});

app.get('/', function (req, res) {

    console.log('\n');
    console.log('******* INCOMING GET REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');

    var html = fs.readFileSync('657/templates/base.html');
    res.end(html);

});