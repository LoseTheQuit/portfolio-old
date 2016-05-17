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


// var spotify_redirect_uri = 'http://localhost:5000/views/werkspayce.html/spotify-callback'; // Your redirect uri
var spotify_redirect_uri = 'https://losethequit.herokuapp.com/views/werkspayce.html/spotify-callback'; // Your redirect uri
var spotify_client_id = '099060b613284cc0af0210f5199dcb0c'; // Your client id
var spotify_client_secret = '42c98e7bfcf6426dbf25888204456dce'; // Your secret
 
app.get('/spotify', function (req, res) {

    console.log('START *** SPOTIFY - INCOMING INPUT GET REQUEST - SPOTIFY *** START'.black.bgCyan);
    var spotifyApiUrl = 'https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=20';
    client.get(spotifyApiUrl, function (data, response) {
        // console.log(data.items);
        res.send(data.items);
        res.end();
    });

    console.log('END *** SPOTIFY - INCOMING INPUT GET REQUEST - SPOTIFY *** END'.black.bgCyan);

});

app.get('/views/werkspayce.html/spotify-login', function (req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    var scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: spotify_client_id,
            scope: scope,
            redirect_uri: spotify_redirect_uri,
            state: state
        }));

    console.log('*******************************************************'.black.bgCyan);
    console.log('*******************************************************'.black.bgCyan);

});

app.get('/views/werkspayce.html/spotify-callback', function (req, res) {

    console.log('******** spotify-callback **** START **** spotify-callback ********'.black.bgCyan);


    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    console.log('code: ' + code);
    var state = req.query.state || null;
    console.log('state: ' + state);
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    console.log('storedState: ' + storedState);

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: spotify_redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                // res.redirect('/views/werkspayce.html?' +

                res.redirect('http://localhost:5000/instagram-login?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/views/werkspayce.html?' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }

    console.log('******** spotify-callback **** END **** spotify-callback ********'.black.bgCyan);

});

app.post('/twitter', function (req, res) {

    console.log('\n');
    console.log('TWITTER - INCOMING POST REQUEST - TWITTER'.white.bgBlue);

    twitterClient.get('statuses/user_timeline', {
        screen_name: 'nodejs',
        count: '50'
    }, function (error, tweets, response) {

        if (!error) {
            res.json(tweets);
        } else {
            res.json(error);
            console.log(error);
        }

    });

});