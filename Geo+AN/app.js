/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

var http = require('http');
var path = require('path');

var fs = require('fs');
var jsdom = require("jsdom");
var htmlSource = fs.readFileSync("index.html", "utf8");
    function documentToSource(doc) {
        // The non-standard window.document.outerHTML also exists,
        // but currently does not preserve source code structure as well

        // The following two operations are non-standard
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

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var Twitter = require('twitter');
//var convert = require('static-maps');

var app = express();
//setting up express server
var client = new Twitter({
  consumer_key: 'NolHz691z4uhw6FhwDIiKcGXz',
  consumer_secret: 'FiAz1xTAGmav5xdKVPTqzgci0HX5N5YT8QjhW4L9y0mByGDypo',
  access_token_key: '4732218563-3dX3xfzpHaDxSIZPgVV6AUxQpBjusVI7senf9qD',
  access_token_secret: 'Ap5eVnwhkKLwyH12A50X43XO71tOZIFA57VeCikuo6Fln'
});

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
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
    var address = req.body.address;
	var city = req.body.city;
	var state = req.body.state;
    console.log(address);
    console.log(city);
    console.log(state);
    if (!address && !city && !state)
		res.render('index.html');
    else{
    var params = {q: city.toString()};
        client.get('search/tweets', params, function(error, tweets, response){
            if (!error) {
                console.log(tweets);
                call_jsdom(htmlSource, function(window) {
                        var $ = require('jquery')(window);
                        //var title = $("title").text();
                        //$('#test').html("---------");
                        //$('#test').html("---------");
                        $('#tweet1').text("Wow");
                        fs.writeFile('index.html', window.document.documentElement.outerHTML,function (error){
                            if (error) throw error;
                        });
                        res.render('index.html');
                        console.log($('#test'));
                    });
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
