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
    Client = require('node-rest-client').Client;;

var client = new Client();

// swap dev/production data

//let client_id = "b23670e220f14f1c89c11f627c9f9953";
//let client_secret = "dd78c7ffbadd4a10a49f24675356c4d2";
//let redirect_uri = 'https://losethequit.herokuapp.com/views/werkspayce.html';

let client_id = "d0f6230a40954cb2823768aa53910a5e";
let client_secret = "bfb29d9f5ee94a46a675f771e9013477";
let redirect_uri = 'http://localhost:5000/views/werkspayce.html';

// Use this to hide the client id
//var authorize_link = 'https://api.instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=code';

//

var spotify_client_id = '099060b613284cc0af0210f5199dcb0c'; // Your client id
var spotify_client_secret = '42c98e7bfcf6426dbf25888204456dce'; // Your secret
var spotify_redirect_uri = 'http://localhost:5000/views/werkspayce.html'; // Your redirect uri

var scopes = 'user-read-private user-read-email'

//

// https://accounts.spotify.com/authorize/?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('static'));

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

var twitterClient = new Twitter({
    consumer_key: 'qiQPf27ifq8tSBHCAqtu6iHLU',
    consumer_secret: 'hMNZdyYyVT4SXTGbd60qE5WVe8wfO9no0mlvJNseRreJDumjQP',
    access_token_key: '4882645629-rFYbk7Bz2tw4Z9QEAce62S8SY3MJRNS6HTy3tOk',
    access_token_secret: 'Q4NhcvlrW81xQREPH4yQvOR9iwlSQqmC4AVOK9QQOiq7h'
});

app.post('/twitter', function (req, res) {

    console.log('INCOMING POST REQUEST - Load Template');

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

app.post('/twitterinputquery', function (req, res) {

    console.log('INCOMING INPUT POST REQUEST - Load Template');

    console.log(req.body);

    twitterClient.get('statuses/user_timeline', req.body, function (error, tweets, response) {

        if (!error) {
            //console.log(tweets);
            res.json(tweets);
        } else {
            res.json(error);
            console.log(error);
        }
    });




});

app.post('/searchTweetsQuery', function (req, res) {

    console.log('INCOMING INPUT GET REQUEST - search-tweets-query');

    console.log(req.body);

    twitterClient.get('search/tweets', req.body, function (error, tweets, response) {

        if (!error) {
            //console.log(tweets);
            res.json(tweets);
        } else {
            res.json(error);
            console.log(error);
        }
    });

});



app.get('/spotify', function (req, res) {


    console.log('INCOMING INPUT GET REQUEST - SPOTIFY');
    console.log('INCOMING INPUT GET REQUEST - SPOTIFY');
    console.log('INCOMING INPUT GET REQUEST - SPOTIFY');

    var spotifyApiUrl = 'https://accounts.spotify.com/authorize/?client_id=' + spotify_client_id + '&response_type=code&redirect_uri=' + spotify_redirect_uri + '&scope=user-read-private%20user-read-email&state=34fFs29kd09';

    // direct way 
    client.get(spotifyApiUrl, function (data, response) {

        // parsed response body as js object 
        console.log('spotifyApiUrl: ' + data);
        // raw response 
        console.log('spotifyApiUrl: ' + response);

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

var tokenContainer = [];

app.post('/ig', function (req, res, next) {

    console.log('\n');
    console.log('*******************************************************'.black.bgGreen);
    console.log('ACCESS_CODE: ' + req.body.token);
    console.log('ACCESS_CODE: ' + req.body.token);
    console.log('ACCESS_CODE: ' + req.body.token);
    console.log('ACCESS_CODE: ' + req.body.token);
    console.log('ACCESS_CODE: ' + req.body.token);
    console.log('INPUT_QUERY: ' + req.body.token);

    let ACCESS_CODE = req.body.token;

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
        //  console.log(parsedBody); 
        console.log('*******************************************************'.black.bgGreen);

        if (response.statusCode != 200) {
            console.error(error);
        } else {

            console.log('ACCESS_TOKEN: ' + parsedBody.access_token);
            tokenContainer.push(parsedBody.access_token);

            console.log('tokenContainer.push(parsedBody.access_token)');

            checkCodeContainer()

            // res.send(customRequest());

            var from_the_docs = {
                url: 'https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + tokenContainer[0],
                method: 'GET'

            };
            var media_search = {
                url: 'https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=' + tokenContainer[0],
                method: 'GET'
            };

            var popular_media_search = {
                url: 'https://api.instagram.com/v1/media/popular?access_token=' + tokenContainer[0],
                method: 'GET'
            };

            var from_SO_search = {
                url: 'https://api.instagram.com/v1/tags/res/media/recent?client_id=' + client_id + '&callback=' +
                    redirect_uri + '&access_token=' + tokenContainer[0],
                method: 'GET'
            }
            var from_SO_search = {
                url: 'https://api.instagram.com/v1/tags/res/media/recent?client_id=' + client_id + '&callback=' +
                    redirect_uri + '&access_token=' + tokenContainer[0],
                method: 'GET'
            }

            var user_search_by_name = {
                url: 'https://api.instagram.com/v1/users/search?q=cthagod&access_token=' + tokenContainer[0],
                method: 'GET'
            }

            // THESE WORK - thisIsCamelCaseAsAnExample this

            var self_search = {
                url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + tokenContainer[0] + '&count=300',
                method: 'GET'
            };

            var popular_tag_search = {
                url: 'https://api.instagram.com/v1/tags/search?q=red&access_token=' + tokenContainer[0],
                method: 'GET'
            };

            var search_popular_by_tag_name = {
                url: 'https://api.instagram.com/v1/tags/nodejs?access_token=' + tokenContainer[0],
                method: 'GET'
            };
            var popular_tag_search_tag_name_recent = {
                url: 'https://api.instagram.com/v1/tags/dev/media/recent?access_token=' + tokenContainer[0] + '&count=200',
                method: 'GET'
            };

            //&min_id=678453535718114828_919796408

            request(self_search, function (error, response, body) {
                if (error && response.statusCode != 200) {
                    console.error(error);
                    return error
                } else {
                    var jsonobjArr = JSON.parse(body);
                    console.log('*******************************************************'.black.bgGreen);

                    // turns off back end logging of user info.data

                    // console.log(jsonobjArr);
                    console.log('*******************************************************'.black.bgGreen);
                    //return jsonobjArr
                    res.send(jsonobjArr);
                }
            });
        }
    });

});

function checkCodeContainer() {

    if (tokenContainer.length > 1) {
        console.log('true')
        console.log('tokenContainer.length IS > 1')


    } else {
        console.log('false')
        console.log('tokenContainer.length IS NOTE > 1')

    }
}

app.post('/instaInputQuery', function (req, res, next) {

    console.log('instaInputQuery + instaInputQuery')
    console.log('instaInputQuery + instaInputQuery')
    console.log('instaInputQuery + instaInputQuery')
    console.log('instaInputQuery + instaInputQuery')
    console.log('instaInputQuery + instaInputQuery')
    console.log('instaInputQuery + instaInputQuery')
    console.log('\n');
    console.log('*******************************************************'.black.bgGreen);
    console.log('ACCESS_CODE: ' + req.body.token);
    console.log('INPUT_QUERY: ' + req.body.query);
    console.log('INPUT_QUERY: ' + req.body.query);
    console.log('INPUT_QUERY: ' + typeof req.body.query);
    console.log('INPUT_QUERY: ' + typeof req.body.query); // returns string

    var redBook = '48 Laws';
    let inputQueryFromHTML = req.body.query;

    console.log('ACCESS_TOKEN: ' + tokenContainer[0]);

    checkCodeContainer()

    // res.send(customRequest());
    var from_the_docs = {
        url: 'https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + tokenContainer[0],
        method: 'GET'

    };
    var media_search = {
        url: 'https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=' + tokenContainer[0],
        method: 'GET'
    };

    var popular_media_search = {
        url: 'https://api.instagram.com/v1/media/popular?access_token=' + tokenContainer[0],
        method: 'GET'
    };

    var from_SO_search = {
        url: 'https://api.instagram.com/v1/tags/res/media/recent?client_id=' + client_id + '&callback=' +
            redirect_uri + '&access_token=' + tokenContainer[0],
        method: 'GET'
    }
    var from_SO_search = {
        url: 'https://api.instagram.com/v1/tags/res/media/recent?client_id=' + client_id + '&callback=' +
            redirect_uri + '&access_token=' + tokenContainer[0],
        method: 'GET'
    }

    var user_search_by_name = {
        url: 'https://api.instagram.com/v1/users/search?q=cthagod&access_token=' + tokenContainer[0],
        method: 'GET'
    }

    // THESE WORK

    var self_search = {
        url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + tokenContainer[0] + '&count=300',
        method: 'GET'
    };

    var popular_tag_search = {
        url: 'https://api.instagram.com/v1/tags/search?q=red&access_token=' + tokenContainer[0],
        method: 'GET'
    };

    var search_popular_by_tag_name = {
        url: 'https://api.instagram.com/v1/tags/' + req.body.query + '?access_token=' + tokenContainer[0],
        method: 'GET'
    };

    var popular_tag_search_tag_name_recent = {
        url: 'https://api.instagram.com/v1/tags/' + req.body.query + '/media/recent?access_token=' + tokenContainer[0] + '&count=200',
        method: 'GET'
    };

    request(popular_tag_search_tag_name_recent, function (error, response, body) {
        if (error || response.statusCode != 200) {
            error = error || response;
            console.error(error);
            res.send(error);
        } else {
            var JSONobjArray = JSON.parse(body);
            console.log('*******************************************************'.black.bgGreen);
            console.log(JSONobjArray);
            console.log('*******************************************************'.black.bgGreen);
            res.send(JSONobjArray);
        }
    });

    //



});

////https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10