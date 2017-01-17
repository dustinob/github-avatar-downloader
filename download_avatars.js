var args = process.argv;
var request = require('request');
var fs = require('fs');

var GITHUB_USER = 'dustinob';
var GITHUB_TOKEN = "5496f73a65ad252cc335b9c823c5cbf9db9a939c";

if(!args[2] || !args[3]) {
    console.log("Need some arguments bro!")
    return false;
  }

function getRepoContributors (repoOwner, repoName, callback) {

  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  console.log(requestURL);

  var options = {
    url: requestURL,
    headers: {'user-agent': 'dustinob'}
  }

  request.get(options, function(err, response) {
    var parsed = JSON.parse(response.body);
    parsed.forEach(function(element) {
      if(!fs.existsSync('./avatars')) {
        fs.mkdirSync('./avatars');
      }

      downloadImageByURL(element.avatar_url,'./avatars/' + element.login + '.jpg')
    })

  });
}

function downloadImageByURL (url, filePath) {

 request.get(url)
        .on('error', function (err) {
          throw err;
        })
        .on('response', function (response) {
          console.log('Response Status Code: ', response.statusCode);
          console.log("Downloading Image...")
        })
        .pipe(fs.createWriteStream(filePath));
}

  getRepoContributors(args[2], args[3], function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);

  });

