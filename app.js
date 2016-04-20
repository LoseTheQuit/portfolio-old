'use strict';
//var Client = require('node-rest-client').Client;
//var client = new Client();
var fs = require('fs');
var colors = require('colors');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var Twitter = require('twitter');



app.use(express.static('static'));

app.use(bodyParser.json({
    type: 'application/*+json'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())

app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {

    console.log('INCOMING GET REQUEST - Load Template');
    var html = fs.readFileSync('static/views/shell.html');
    res.end(html);

});
https: //www.instagram.com/oauth/authorize/?client_id=e272444723924d49bb78da2b5e5c4dfd&redirect_uri=https://losethequit.herokuapp.com/views/mashupShell.html&response_type=code

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

app.listen(app.get('port'), function () {
    console.log('\n');
    console.log('********************************************'.black.bgWhite);
    console.log("The frontend server is running on port 5000!".black.bgWhite);
    console.log('********************************************'.black.bgWhite);
    console.log('\n');
});

mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function () {
    console.log("connect has been made")
        // we're connected! 
});

var mongoConnection = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/foobar');

//

var Client = require('node-rest-client').Client;

var client = new Client();

var base_ig_api_url = 'https://api.instagram.com/oauth/authorize/?client_id';
var ig_client_id = 'e272444723924d49bb78da2b5e5c4dfd';
var ig_redirect_url = '&redirect_uri=https://losethequit.herokuapp.com/views/mashupShell.html/handleauth';
var response_type = '&response_type=code';
var complete_ig_api_request = base_ig_api_url + ig_client_id + ig_redirect_url + response_type;
// direct way 


app.post('/ig', function (req, res, next) {

    client.post(complete_ig_api_request, function (data, response) {
        // parsed response body as js object 
        //        console.log(data);
        // raw response 
        //       console.log(res);

        console.log(data.body);

        for (let key in res) {


            //            console.log('KEY ' + key);
            //            console.log('data ' + res[key]);
        }
    });

});

var http = require('http');
var express = require('express');
var api = require('instagram-node').instagram();
var app = express();


api.use({
    client_id: 'e272444723924d49bb78da2b5e5c4dfd',
    client_secret: '95196ee487154c46b9dcb662483aa509'
});

var redirect_uri = 'https://losethequit.herokuapp.com/views/mashupShell.html/handleauth';

exports.authorize_user = function (req, res) {
    res.redirect(api.get_authorization_url(redirect_uri, {
        scope: ['likes'],
        state: 'a state'
    }));
};

exports.handleauth = function (req, res) {
    api.authorize_user(req.query.code, redirect_uri, function (err, result) {
        if (err) {
            console.log(err.body);
            res.send("Didn't work");
        } else {
            console.log('Yay! Access token is ' + result.access_token);
            res.send('You made it!!');
        }
    });
};

// This is where you would initially send users to authorize 
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI 
app.get('/handleauth', exports.handleauth);

//app.post('/ig', function (req, res, next) {
//    var ig = require('instagram-node').instagram({});
//    //    ig.use({
//    //        access_token: 'YOUR_ACCESS_TOKEN'
//    //    });
//
//    ig.use({
//        client_id: 'e272444723924d49bb78da2b5e5c4dfd',
//        client_secret: '95196ee487154c46b9dcb662483aa509'
//    });
//    //
//    //    https: //api.instagram.com/oauth/authorize/?client_id=e272444723924d49bb78da2b5e5c4dfd&redirect_uri=https://losethequit.herokuapp.com/views/mashupShell.html&response_type=code 
//    ig.add_like(req.body, {
//        sign_request: {
//            client_secret: '95196ee487154c46b9dcb662483aa509',
//            // Then you can specify the request:
//            client_req: req,
//            // or the IP on your own:
//            ip: 'XXX.XXX.XXX.XXX'
//        }
//
//    }, function (err) {
//        // handle err here
//        console.log(err);
//        res.send(err[1]);
//    });
//});