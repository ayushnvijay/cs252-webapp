var express = require('express');

var http = require('http');
var path = require('path');
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var tweetLocation =  require('tweet-location');


var fs = require('fs');
var jsdom = require("jsdom");
var htmlSource = fs.readFileSync("index.html", "utf8");
    function documentToSource(doc) {
        return doc.doctype.toString()+doc.innerHTML;
    }
    function call_jsdom(source, callback) {
        jsdom.env(
            source,
            [ "http://code.jquery.com/jquery.js"],
            function(errors, window) {
                process.nextTick(
                    function () {
                        if (errors) {
                            throw new Error("There were errors: "+errors);
                        }
                        callback(window);
                    }
                );
            }
        );
    }


// create a new express server
var Twitter = require('twitter');
var app = express();
var client = new Twitter({
  consumer_key: 'NolHz691z4uhw6FhwDIiKcGXz',
  consumer_secret: 'FiAz1xTAGmav5xdKVPTqzgci0HX5N5YT8QjhW4L9y0mByGDypo',
  access_token_key: '4732218563-3dX3xfzpHaDxSIZPgVV6AUxQpBjusVI7senf9qD',
  access_token_secret: 'Ap5eVnwhkKLwyH12A50X43XO71tOZIFA57VeCikuo6Fln'
});

app.configure(function(){
    app.set('port', appEnv.port || 3000);
    app.set('views', __dirname + '/');
    app.set('view engine', 'html');
    app.engine('html', require('hogan-express'));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname,'public')));
});

app.configure('development',function(){
    app.use(express.errorHandler());
});

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.all('/', function (req, res) {

    res.render('index.html');
});
app.post('/location', function(req, res){
    var topic1 = req.body.topic1;
	var topic2 = req.body.topic2;
	var topic3 = req.body.topic3;
    console.log(topic1);
    console.log(topic2);
    console.log(topic3);
    if (!topic1 && !topic2 && !topic3)
		res.render('index.html');
    else{
    var space = " ";
    var final = topic1.toString().concat(space).concat(topic2.toString()).concat(space);
    final = final.concat(topic3.toString());
    var params = {q: final};
    console.log("params");
    console.log(params);
        client.get('search/tweets', params, function(error, tweets, response){
            if (!error) {
                console.log(tweets.statuses[0]);
                if (typeof(tweets.statuses[0]) != 'undefined') {
                    console.log(tweets.statuses[0].text);
                    console.log(tweets.statuses[0].user.screen_name);
                    console.log(tweets.statuses[0].user.location);
                    console.log(tweets.statuses[0].user.profile_image_url);
                    console.log(tweets.statuses.length);
                    //console.log(JSON.stringify(tweets[0]));
                    call_jsdom(htmlSource, function(window) {
                            var $ = require('jquery')(window);
                            if (typeof(tweets.statuses[0]) != 'undefined') {
                                $('#tweet1').text(tweets.statuses[0].text);
                                $('#user1').text(tweets.statuses[0].user.screen_name);
                                //console.log("hopefully changing image");
                                $('#tweet1Pic').attr('src',tweets.statuses[0].user.profile_image_url.toString());
                                $('#tweet1Pic').width(50); // Units are assumed to be pixels
                                $('#tweet1Pic').height(50);
                                //$('#tweet1Pic').src = tweets.statuses[0].user.profile_image_url;
                            } else {
                                $('#tweet1').text("");
                                $('#tweet1Pic').width(0); // Units are assumed to be pixels
                                $('#tweet1Pic').height(0);
                            }
                            if (typeof(tweets.statuses[1]) != 'undefined') {
                                $('#tweet2').text(tweets.statuses[1].text);
                                $('#user2').text(tweets.statuses[1].user.screen_name);
                                $('#tweet2Pic').attr('src',tweets.statuses[1].user.profile_image_url.toString());
                                $('#tweet2Pic').width(50); // Units are assumed to be pixels
                                $('#tweet2Pic').height(50);
                            } else {
                                $('#tweet2').text("");
                                $('#tweet2Pic').width(0); // Units are assumed to be pixels
                                $('#tweet2Pic').height(0);
                            }
                            if (typeof(tweets.statuses[2]) != 'undefined') {
                                $('#tweet3').text(tweets.statuses[2].text);
                                $('#user3').text(tweets.statuses[2].user.screen_name);
                                $('#tweet3Pic').attr('src',tweets.statuses[2].user.profile_image_url.toString());
                                $('#tweet3Pic').width(50); // Units are assumed to be pixels
                                $('#tweet3Pic').height(50);
                            } else {
                                $('#tweet3').text("");
                                $('#tweet3Pic').width(0); // Units are assumed to be pixels
                                $('#tweet3Pic').height(0);
                            }
                            if (typeof(tweets.statuses[3]) != 'undefined') {
                                $('#tweet4').text(tweets.statuses[3].text);
                                $('#user4').text(tweets.statuses[3].user.screen_name);
                                $('#tweet4Pic').attr('src',tweets.statuses[3].user.profile_image_url.toString());
                                $('#tweet4Pic').width(50); // Units are assumed to be pixels
                                $('#tweet4Pic').height(50);
                            } else {
                                $('#tweet4').text("");
                                $('#tweet4Pic').width(0); // Units are assumed to be pixels
                                $('#tweet4Pic').height(0);
                            }
                            if (typeof(tweets.statuses[4]) != 'undefined') {
                                $('#tweet5').text(tweets.statuses[4].text);
                                $('#user5').text(tweets.statuses[4].user.screen_name);
                                $('#tweet5Pic').attr('src',tweets.statuses[4].user.profile_image_url.toString());
                                $('#tweet5Pic').width(50); // Units are assumed to be pixels
                                $('#tweet5Pic').height(50);
                            } else {
                                $('#tweet5').text("");
                                $('#tweet5Pic').width(0); // Units are assumed to be pixels
                                $('#tweet5Pic').height(0);
                            }
                            if (typeof(tweets.statuses[5]) != 'undefined') {
                                $('#tweet6').text(tweets.statuses[5].text);
                                $('#user6').text(tweets.statuses[5].user.screen_name);
                                $('#tweet6Pic').attr('src',tweets.statuses[5].user.profile_image_url.toString());
                                $('#tweet6Pic').width(50); // Units are assumed to be pixels
                                $('#tweet6Pic').height(50);
                            } else {
                                $('#tweet6').text("");
                                $('#tweet6Pic').width(0); // Units are assumed to be pixels
                                $('#tweet6Pic').height(0);
                            }
                            fs.writeFile('index.html', window.document.documentElement.outerHTML,function (error){
                                if (error) throw error;
                            });
                            res.render('index.html');
                            //console.log($('#test'));
                        });
                }
            }
            else{
                console.log(error);
            }
        });
    }
});
// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
//convert();
	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
