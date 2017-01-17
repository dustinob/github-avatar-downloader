var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'dustinob';
var GITHUB_TOKEN = "5496f73a65ad252cc335b9c823c5cbf9db9a939c";


function getRepoContributors (repoOwner, repoName, callback) {

  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  console.log(requestURL);

  var options = {
    url: requestURL,
    headers: {'user-agent': 'dustinob'}
  }

  request.get(options, function(err, response) {
    var parsed = JSON.parse(response.body);
    console.log(parsed);
    //console.log(JSON.parse(response));
  });
}

  getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);

  });