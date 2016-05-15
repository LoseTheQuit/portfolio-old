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