module.exports = require('./node_modules/twitter-js-client/lib/Twitter');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};

/**
* Please use your twitter app configuration here
**/
var config = {
    "consumerKey": "",
    "consumerSecret": "",
    "accessToken": "",
    "accessTokenSecret": ""
};

var twitter = new module.exports.Twitter(config);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/*
 * To connect to a front end app (i.e. AngularJS) store all your files you will *
 * statically store in declared below (i.e. ./public) *
*/

app.use(express.static('public'));

//post to retrieve user data
app.post('/cnnbrk-tweets', function (req, res) {
	var username = req.body.username;
	var data = twitter.getUserTimeline({ screen_name: username, count: 10}, function(error, response, body){
		res.status(404).send({
			"error" : "User Not Found"
		});
	}, function(data){
		res.send({
			result : {
				"twitterData" : data
			}
		});
	});
});

var server = app.listen(3000, function () {
  	var host = server.address().address;
  	var port = server.address().port;
});