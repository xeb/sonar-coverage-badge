var http = require('http'),
  url = require('url'),
  uuid = require('uuid'),
  badger = require('./lib/badger.js');

require('dotenv').config({silent: true});

function index() {
  this.GetPort = getPort;
  this.StartServer = startServer;
}

module.exports = new index();

function getPort() {
  var port = process.argv[2];
  if (port !== undefined) {
    port = port.split('=')[1];
  }
  if (!port) {
    port = 8087;
  }
  return port;
}

function startServer(port) {
  var server = http.createServer(function(req, res) {
    var request = url.parse(req.url, true);

    var coverageHandler = function(coverage, formatedValue) {
      var image = badger.GenerateImage(coverage, formatedValue, request.query.metrics);
      var headers = {
        'Content-Type': 'image/svg+xml;charset=utf-8',
        'Cache-Control': 'no-cache',
        'ETag': uuid.v4()
      };
      res.writeHead(200, headers);
      res.end(image);
    };

    var onError = function(e) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end(e.toString());
    };

    badger.GetCoverage(request.query.server || process.env.SONAR_HOST,
      request.query.ssl,
      request.query.resource,
      request.query.metrics,
      request.query.token || process.env.SONAR_TOKEN,
      coverageHandler,
      onError);

  }).listen(port);

  return server;
}

var port = getPort();
startServer(port);
