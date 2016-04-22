'use strict';

let fs = require('fs'),
    colors = require('colors'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    https = require('https'),
    http = require('http'),
    Twitter = require('twitter');


let client_id = "b23670e220f14f1c89c11f627c9f9953";
let client_secret = "dd78c7ffbadd4a10a49f24675356c4d2";
let redirect_uri = 'http://localhost:5000/views/mainShell.html';
var authorize_link = 'https://api.instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=code';


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('static'));

app.use('/bower_components', express.static(__dirname + '/bower_components'));
var twitterClient = new Twitter({
    consumer_key: 'qiQPf27ifq8tSBHCAqtu6iHLU',
    consumer_secret: 'hMNZdyYyVT4SXTGbd60qE5WVe8wfO9no0mlvJNseRreJDumjQP',
    access_token_key: '4882645629-rFYbk7Bz2tw4Z9QEAce62S8SY3MJRNS6HTy3tOk',
    access_token_secret: 'Q4NhcvlrW81xQREPH4yQvOR9iwlSQqmC4AVOK9QQOiq7h'
});

app.post('/twitter', function (req, res) {

    console.log('INCOMING POST REQUEST - Load Template');

    twitterClient.get('statuses/user_timeline', {
        screen_name: 'nodejs'
    }, function (error, tweets, response) {

        if (!error) {
            res.json(tweets);
        } else {
            res.json(error);
            console.log(error);
        }

    });

});

app.post('/inputquery', function (req, res) {

    console.log('INCOMING INPUT POST REQUEST - Load Template');

    console.log(req.body);

    twitterClient.get('statuses/user_timeline', req.body, function (error, tweets, response) {

        if (!error) {
            res.json(tweets);
        } else {
            res.json(error);
            console.log(error);
        }
    });

});
app.get('/', function (req, res) {

    console.log('INCOMING GET REQUEST - Load Template');
    var html = fs.readFileSync('static/views/shell.html');
    res.end(html);

});

app.get('/authorize_user', function (req, res) {

    console.log('\n');
    console.log('*******************************************************'.black.bgWhite);
    console.log('INCOMING GET - authorize_user - REQUEST - Load Template'.black.bgWhite);
    console.log('*******************************************************'.black.bgWhite);
    res.redirect(authorize_link);

});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {

    console.log('\n');
    console.log('********************************************'.black.bgWhite);
    console.log("The frontend server is running on port 5000!".black.bgWhite);
    console.log('********************************************'.black.bgWhite);
    console.log('\n');

});

app.post('/ig', function (req, res, next) {

    console.log('\n');
    console.log('*******************************************************'.black.bgGreen);
    console.log('ACCESS_CODE: ' + req.body.token);

    let ACCESS_CODE = req.body.token;

    let request = require('request');

    let post_data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
        'code': ACCESS_CODE
    };

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    var post_options = {
        url: 'https://api.instagram.com/oauth/access_token',
        method: 'POST',
        headers: headers,
        form: post_data
    };


    request(post_options, function (error, response, body) {

        var parsedBody = JSON.parse(body);
        console.log('*******************************************************'.black.bgGreen);
        console.log(parsedBody);
        console.log('*******************************************************'.black.bgGreen);

        if (response.statusCode != 200) {
            console.error(error);
        } else {

            console.log('ACCESS_TOKEN: ' + parsedBody.access_token);


            // THESE DON'T WORK
            var from_the_docs = {
                url: 'https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + parsedBody.access_token,
                method: 'GET'
            };
            var media_search = {
                url: 'https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=' + parsedBody.access_token,
                method: 'GET'
            };

            var popular_media_search = {
                url: 'https://api.instagram.com/v1/media/popular?access_token=' + parsedBody.access_token,
                method: 'GET'
            };

            var from_SO_search = {
                url: 'https://api.instagram.com/v1/tags/res/media/recent?client_id=' + client_id + '&callback=' +
                    redirect_uri + '&access_token=' + parsedBody.access_token,
                method: 'GET'
            }
            var from_SO_search = {
                url: 'https://api.instagram.com/v1/tags/res/media/recent?client_id=' + client_id + '&callback=' +
                    redirect_uri + '&access_token=' + parsedBody.access_token,
                method: 'GET'
            }

            var user_search_by_name = {
                url: 'https://api.instagram.com/v1/users/search?q=cthagod&access_token=' + parsedBody.access_token,
                method: 'GET'
            }

            //

            // THESE WORK

            var self_search = {
                url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + parsedBody.access_token + '&count=300',
                method: 'GET'
            };

            var popular_tag_search = {
                url: 'https://api.instagram.com/v1/tags/search?q=red&access_token=' + parsedBody.access_token,
                method: 'GET'
            };

            var search_popular_by_tag_name = {
                url: 'https://api.instagram.com/v1/tags/nodejs?access_token=' + parsedBody.access_token,
                method: 'GET'
            };
            var popular_tag_search_tag_name_recent = {
                url: 'https://api.instagram.com/v1/tags/nodejs/media/recent?access_token=' + parsedBody.access_token + '&count=200',
                method: 'GET'
            };

            // 

            //&min_id=678453535718114828_919796408
            request(self_search, function (error, response, body) {
                if (error && response.statusCode != 200) {
                    console.error(error);
                    res.send(error);
                } else {
                    var jsonobjArr = JSON.parse(body);
                    console.log('*******************************************************'.black.bgGreen);
                    console.log(jsonobjArr);
                    console.log('*******************************************************'.black.bgGreen);
                    res.send(jsonobjArr);
                }
            });

        }
    });

});


////https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10
//
//You have to set the header:
//
//    let request = require('request');
//
//let post_data = {
//    'client_id': client_id,
//    'client_secret': client_secret,
//    'grant_type': 'authorization_code',
//    'redirect_uri': redirect_uri,
//    'code': ACCESS_CODE
//};
//
//var headers = {
//    'User-Agent': 'Super Agent/0.0.1',
//    'Content-Type': 'application/x-www-form-urlencoded'
//};
//
//var post_options = {
//    url: 'https://api.instagram.com/oauth/access_token',
//    method: 'POST',
//    headers: headers,
//    form: post_data
//};
//
//
//request(post_options, function (error, response, body) {
//
//    var parsedBody = JSON.parse(body);
//    console.log('ACCESS_TOKEN: ' + parsedBody.access_token);
//
//});
//
////http: //stackoverflow.com/questions/24675408/instagram-api-oauthexception-you-must-provide-a-client-id