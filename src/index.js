var http = require('http'),
  url = require('url'),
  uuid = require('uuid'),
  badger = require('./lib/badger.js');

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

    var coverageHandler = function(coverage) {
      var image = badger.GenerateImage(coverage, request.query.metrics);
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

    badger.GetCoverage(request.query.server,
      request.query.ssl === 'true',
      request.query.resource,
      request.query.metrics,
      coverageHandler,
      onError);

  }).listen(port);

  return server;
}

var port = getPort();
startServer(port);
