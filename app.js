var fs = require('fs');
var url = require('url');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');

var url_arr = []

fs.readFile('links_edit.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  seperateLinks(data)
})

var seperateLinks = function(links) {
  var url_arr = links.split("\n");
  var index = url_arr.indexOf("");
  if (index > -1) {
    url_arr.splice(index, 1);
  }

  url_arr.forEach(function(download_url) {
    request(download_url, function(err, resp, body){
      $ = cheerio.load(body);
      $('iframe').each(function(index, element) {
        var file_url = $(element).attr('src'); // --> Get the URL of the iframe
        if (file_url.startsWith('//player.vimeo.com')) {
          fs.appendFileSync('link_results.txt', 'File URL \n'),
          fs.appendFileSync('link_results.txt', file_url),
          fs.appendFileSync('link_results.txt', '\nDownload URL \n'),
          fs.appendFileSync('link_results.txt', download_url),
          fs.appendFileSync('link_results.txt', '\n-------- \n')
        }
      });
    });
  })
}
