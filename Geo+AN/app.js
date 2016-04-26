/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var Twitter = require('twitter');


var app = express();

var client = new Twitter({
  consumer_key: 'NolHz691z4uhw6FhwDIiKcGXz',
  consumer_secret: 'FiAz1xTAGmav5xdKVPTqzgci0HX5N5YT8QjhW4L9y0mByGDypo',
  access_token_key: '4732218563-3dX3xfzpHaDxSIZPgVV6AUxQpBjusVI7senf9qD',
  access_token_secret: 'Ap5eVnwhkKLwyH12A50X43XO71tOZIFA57VeCikuo6Fln'
});
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});
client.get('favorites/list', function(error, tweets, response){
  if(error) throw error;
  console.log(tweets);  // The favorites.
  console.log(response);  // Raw response object.
});





// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
