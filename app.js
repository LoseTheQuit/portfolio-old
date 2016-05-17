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

var instagramAccessCode = 'FOR-TEMPORARY-USE-ONLY';
var spotifyAccessToken = 'FOR-TEMPORARY-USE-ONLY';

var twitterClient = new Twitter({

    consumer_key: 'qiQPf27ifq8tSBHCAqtu6iHLU',
    consumer_secret: 'hMNZdyYyVT4SXTGbd60qE5WVe8wfO9no0mlvJNseRreJDumjQP',
    access_token_key: '4882645629-rFYbk7Bz2tw4Z9QEAce62S8SY3MJRNS6HTy3tOk',
    access_token_secret: 'Q4NhcvlrW81xQREPH4yQvOR9iwlSQqmC4AVOK9QQOiq7h'

});

// swap dev/production data

//let instagram_client_id = "b23670e220f14f1c89c11f627c9f9953";
//let instagram_client_secret = "dd78c7ffbadd4a10a49f24675356c4d2";
//let instagram_redirect_uri = 'https://losethequit.herokuapp.com/views/werkspayce.html';

let instagram_client_id = "d0f6230a40954cb2823768aa53910a5e";
let instagram_client_secret = "bfb29d9f5ee94a46a675f771e9013477";
let instagram_redirect_uri = 'http://localhost:5000/views/werkspayce.html';

var spotify_client_id = '099060b613284cc0af0210f5199dcb0c'; // Your client id
var spotify_client_secret = '42c98e7bfcf6426dbf25888204456dce'; // Your secret
var spotify_redirect_uri = 'http://localhost:5000/views/werkspayce.html/spotify-callback'; // Your redirect uri

// var spotify_redirect_uri = 'https://losethequit.herokuapp.com/views/werkspayce.html/spotify-callback'; // Your redirect uri


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string 
 * @return {string} The generated string 
 */

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';
var scopes = 'user-read-private user-read-email'

/**
 * ROUTING
 * ROUTING
 * ROUTING
 * ROUTING
 */

app.set('port', (process.env.PORT || 5000));

app.use(express.static('/static'))
    .use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('static'))
    .use(cookieParser());

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', function (req, res) {

    console.log('\n');
    console.log('******* INCOMING GET REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');

    var html = fs.readFileSync('static/views/shell.html');
    res.end(html);

});

app.listen(app.get('port'), function () {

    console.log('\n');
    console.log('********************************************'.black.bgWhite);
    console.log("The frontend server is running on port 5000!".black.bgWhite);
    console.log('********************************************'.black.bgWhite);
    console.log('\n');

});

app.get('/spotify', function (req, res) {

    console.log('START *** SPOTIFY - INCOMING INPUT GET REQUEST - SPOTIFY *** START'.black.bgCyan);
    var spotifyApiUrl = 'https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=20';
    client.get(spotifyApiUrl, function (data, response) {
        // console.log(data.items); 
        res.send(data.items);
        res.end();
    });

    console.log('END ***** SPOTIFY - INCOMING INPUT GET REQUEST - SPOTIFY ***** END'.black.bgCyan);

});

app.get('/views/werkspayce.html/spotify-login', function (req, res) {

    console.log('START *** spotify-login *** START'.black.bgCyan);

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    var scope = 'user-read-private user-read-email';

    console.log('state: ' + state)
    console.log('stateKey: ' + stateKey)

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: spotify_client_id,
            scope: scope,
            redirect_uri: spotify_redirect_uri,
            state: state
        }));

    console.log('END ***** spotify-login ***** END'.black.bgCyan);
    console.log('\n');

});



app.get('/views/werkspayce.html/spotify-callback', function (req, res) {

    console.log('START ***** spotify-callback *** spotify-callback ***** START'.black.bgCyan);

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

                var access_token = body.access_token;
                var refresh_token = body.refresh_token;

                spotifyAccessToken = access_token;

                console.log('\n');
                console.log('SPOTIFY ACCESS TOKEN:'.white.bgCyan);
                // console.log('\n');
                console.log(spotifyAccessToken);
                console.log('SPOTIFY ACCESS TOKEN:'.white.bgCyan);
                console.log('\n');

                //                var options = {
                //                    // url: 'https://api.spotify.com/v1/me',
                //                    url: 'https://api.spotify.com/v1/search?q=tania%20bowra&type=artist',
                //                    headers: {
                //                        'Authorization': 'Bearer ' + access_token
                //                    },
                //                    json: true
                //                };
                //
                //                // use the access token to access the Spotify Web API
                //                request.get(options, function (error, response, body) {
                //                    console.log(body);
                //                });
                //
                //                // we can also pass the token to the browser to make requests from there
                //                // res.redirect('/views/werkspayce.html?' +

                res.redirect('/instagram-login?' +
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
            console.log('END ******* spotify-callback *** spotify-callback ******* END'.black.bgCyan);
        });
    }

});

app.post('/spotify-input-query', function (req, res) {

    console.log('START *** INSIDE spotify-input-query INSIDE ***'.black.bgCyan);
    console.log('\n');
    console.log('START *** INSIDE spotify-input-query -TEXT - INSIDE ***'.black.bgCyan);
    // req.body seems to only work with POST requests
    console.log(req.body);
    console.log('START *** INSIDE spotify-input-query -TEXT - INSIDE ***'.black.bgCyan);

    var options = {
        // url: 'https://api.spotify.com/v1/me',
        url: 'https://api.spotify.com/v1/search?q=' + req.body.q + '&type=artist',
        headers: {
            'Authorization': 'Bearer ' + spotifyAccessToken
        },
        json: true
    };

    // use the access token to access the Spotify Web API
    request.get(options, function (error, response, body) {

        if (response.statusCode === 200) {
            //        console.log(body.artists);
            //        console.log(body.artists.items);

            //                for (var key in response) {
            //                    console.log("KEY: " + key)
            //                }
            //
            //        for (var key in body.artists) {
            //            console.log("KEY: " + key)
            //        }
            res.send(body.artists.items);
        } else {
            console.log(response.body)
        }
    });

    console.log('\n');
    console.log('END *** INSIDE spotify-input-query INSIDE ***'.black.bgCyan);

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

app.post('/searchTwitterQuery', function (req, res) {
    console.log('TWITTER - INPUTQUERY - START - TWITTER'.white.bgBlue);

    console.log('\n');
    console.log('INCOMING INPUT GET REQUEST - search-tweets-query'.white.bgBlue);
    console.log(req.body);
    console.log('INCOMING INPUT GET REQUEST - search-tweets-query'.white.bgBlue);
    console.log('\n');

    twitterClient.get('search/tweets', req.body, function (error, tweets, response) {

        if (!error) {
            //console.log(tweets);
            console.log('***** tweets *** SENT *** tweets *****'.white.bgBlue);
            res.json(tweets);
        } else {
            res.json(error);
            console.log(error);
        }
        console.log('\n');
        console.log('TWITTER - INPUTQUERY - END - TWITTER'.white.bgBlue);
    });

});

app.get('/instagram-login', function (req, res) {

    let proInstagramApiURL = 'http://www.instagram.com/oauth/authorize?client_id=b23670e220f14f1c89c11f627c9f9953&redirect_uri=https://losethequit.herokuapp.com/views/werkspayce.html&response_type=code&scope=basic+public_content+follower_list+comments+relationships+likes';

    let devInstagramApiURL = 'http://www.instagram.com/oauth/authorize?client_id=d0f6230a40954cb2823768aa53910a5e&redirect_uri=http://localhost:5000/views/werkspayce.html&response_type=code&scope=basic+public_content+follower_list+comments+relationships+likes'

    res.redirect(devInstagramApiURL);
    res.end();

});

app.post('/ig', function (req, res, next) {

    console.log('\n');
    console.log('START ***** - IG INCOMING POST REQUEST - IG ***** START'.black.bgGreen);

    if (req.body.token.indexOf("http") != -1) {
        console.log('INSTAGRAM ACCESS_CODE NOT AVAILABLE'.white.bgRed);

        // if the access code IS NOT available
        // STOP the process of making a call to the 
        // instagram api

    } else {

        // if the access code IS available
        // START the process of making a call to the 
        // instagram api

        let ACCESS_CODE = req.body.token;

        let post_data = {
            'client_id': instagram_client_id,
            'client_secret': instagram_client_secret,
            'grant_type': 'authorization_code',
            'redirect_uri': instagram_redirect_uri,
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

            //  console.log('*******************************************************'.black.bgRed);
            //  console.log(parsedBody); 
            //  console.log('*******************************************************'.black.bgRed);

            if (response.statusCode != 200) {

                console.log('ACCESS CODE NOT PRESENT');

            } else {

                instagramAccessCode = parsedBody.access_token;

                console.log('\n');
                console.log('instagramAccessCode:'.white.bgGreen);
                console.log(instagramAccessCode);
                console.log('instagramAccessCode:'.white.bgGreen);
                console.log('\n');

                var from_the_docs = {
                    url: 'https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + instagramAccessCode,
                    method: 'GET'

                };
                var media_search = {
                    url: 'https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=' + instagramAccessCode,
                    method: 'GET'
                };

                var popular_media_search = {
                    url: 'https://api.instagram.com/v1/media/popular?access_token=' + instagramAccessCode,
                    method: 'GET'
                };

                var from_SO_search = {
                    url: 'https://api.instagram.com/v1/tags/res/media/recent?client_id=' + instagram_client_id + '&callback=' +
                        instagram_redirect_uri + '&access_token=' + instagramAccessCode,
                    method: 'GET'
                }
                var from_SO_search = {
                    url: 'https://api.instagram.com/v1/tags/res/media/recent?client_id=' + instagram_client_id + '&callback=' +
                        instagram_redirect_uri + '&access_token=' + instagramAccessCode,
                    method: 'GET'
                }

                var user_search_by_name = {
                    url: 'https://api.instagram.com/v1/users/search?q=cthagod&access_token=' + instagramAccessCode,
                    method: 'GET'
                }

                // THESE WORK - thisIsCamelCaseAsAnExample this

                var self_search = {
                    url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + instagramAccessCode + '&count=300',
                    method: 'GET'
                };

                var popular_tag_search = {
                    url: 'https://api.instagram.com/v1/tags/search?q=red&access_token=' + instagramAccessCode,
                    method: 'GET'
                };

                var search_popular_by_tag_name = {
                    url: 'https://api.instagram.com/v1/tags/nodejs?access_token=' + instagramAccessCode,
                    method: 'GET'
                };
                var popular_tag_search_tag_name_recent = {
                    url: 'https://api.instagram.com/v1/tags/dev/media/recent?access_token=' + instagramAccessCode + '&count=200',
                    method: 'GET'
                };

                //&min_id=678453535718114828_919796408

                request(self_search, function (error, response, body) {
                    if (error && response.statusCode != 200) {
                        console.error(error);
                        return error
                    } else {
                        var JSONObjectArray = JSON.parse(body);
                        // turns off back end logging of user JSONObjectArray
                        // console.log(JSONObjectArray);

                        res.send(JSONObjectArray);

                        console.log('***** JSONObjectArray *** SENT *** JSONObjectArray *****'.black.bgGreen);
                        console.log('\n');
                        console.log('END ******* - IG INCOMING POST REQUEST - IG ******* END'.black.bgGreen);
                    }
                });
            }
        });
    }

});

app.post('/instaInputQuery', function (req, res, next) {

    console.log('\n');
    console.log('START - *** - IG - InputQuery - IG - *** - START'.black.bgGreen);
    console.log(req.body);


    let inputQueryFromHTML = req.body.query;


    var from_the_docs = {
        url: 'https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + instagramAccessCode,
        method: 'GET'

    };
    var media_search = {
        url: 'https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=' + instagramAccessCode,
        method: 'GET'
    };

    var popular_media_search = {
        url: 'https://api.instagram.com/v1/media/popular?access_token=' + instagramAccessCode,
        method: 'GET'
    };

    var from_SO_search = {
        url: 'https://api.instagram.com/v1/tags/res/media/recent?client_id=' + instagram_client_id + '&callback=' +
            instagram_redirect_uri + '&access_token=' + instagramAccessCode,
        method: 'GET'
    }
    var from_SO_search = {
        url: 'https://api.instagram.com/v1/tags/res/media/recent?client_id=' + instagram_client_id + '&callback=' +
            instagram_redirect_uri + '&access_token=' + instagramAccessCode,
        method: 'GET'
    }

    var user_search_by_name = {
        url: 'https://api.instagram.com/v1/users/search?q=cthagod&access_token=' + instagramAccessCode,
        method: 'GET'
    }

    // THESE WORK

    var self_search = {
        url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + instagramAccessCode + '&count=300',
        method: 'GET'
    };

    var popular_tag_search = {
        url: 'https://api.instagram.com/v1/tags/search?q=red&access_token=' + instagramAccessCode,
        method: 'GET'
    };

    var search_popular_by_tag_name = {
        url: 'https://api.instagram.com/v1/tags/' + req.body.query + '?access_token=' + instagramAccessCode,
        method: 'GET'
    };

    var popular_tag_search_tag_name_recent = {
        url: 'https://api.instagram.com/v1/tags/' + req.body.query + '/media/recent?access_token=' + instagramAccessCode + '&count=200',
        method: 'GET'
    };

    request(popular_tag_search_tag_name_recent, function (error, response, body) {

        if (error || response.statusCode != 200) {
            error = error || response;
            // console.error(response.body);
            res.send(response.body);
        } else {
            var JSONobjArray = JSON.parse(body);
            // turns off back end logging of user JSONObjectArray
            // console.log(JSONObjectArray);

            res.send(JSONobjArray);
            console.log('***** JSONObjectArray *** SENT *** JSONObjectArray *****'.black.bgGreen);
            console.log('\n');
            console.log('END - *** - IG - InputQuery - IG - *** - END'.black.bgGreen);
        }

    });

});