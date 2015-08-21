var fs = require('fs'),
  http = require('http'),
  url = require('url'),
  badger = require('./lib/badger.js');

port = process.argv[2];
if(port) { port = port.split('=')[1]; }
if(!port) { port = 8087; }
if(port == 'IIS') { port = process.env.PORT; }

console.log('Listening on ' + port);

http.createServer(function(req,res){
  var request = url.parse(req.url, true);
  if(!request.query.server || !request.query.resource || !request.query.metrics) {
    return;
  }

  var coverageHandler = function(coverage) {
      var image = badger.GenerateImage(coverage, request.query.metrics);
      res.writeHead(200, {'Content-Type':'image/svg+xml;charset=utf-8'});
      res.end(image);
  }

  var onError = function(e) {
    console.log(e);
    res.writeHead(500, {'Content-Type':'text/plain'});
    res.end(e.toString());
  }

  var coverage = badger.GetCoverage(request.query.server,
    request.query.ssl,
    request.query.resource,
    request.query.metrics,
    coverageHandler,
    onError);

}).listen(port);
