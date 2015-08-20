var fs = require('fs'), http = require('http'), url = require('url');

port = process.argv[2];
if(port) { port = port.split('=')[1]; }
if(!port) { port = 8087; }
if(port == 'IIS') { port = process.env.PORT; }

console.log('Listening on ' + port);

var colorSettings = [
  { min: 0, color: '#a00' },
  { min: 70, color: '#00a' },
  { min: 90, color: '#4c1' }
];

function getCoverage(host, ssl, resource, metric, success, error) {
  var coverage = undefined;
  var options = {
    host: host,
    path: '/api/resources?resource=' + resource + '&metrics=' + metric,
    port: ssl ? 443 : 80,
  };

  http.get(options, function(res) {
    var str = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk) { str += chunk; })

    res.on('end', function () {
      try {
        var obj = JSON.parse(str);
        coverage = obj[0].msr[0].val;
        if(coverage) { success(coverage); }
      } catch(e) {
        console.log('Exception parsing response %j\n%j', options, e);
        error(e);
      }
    });

  }).on('error', function(e) {
    console.log('Could not query with options %j\nError is %j', options, e);
  });

  return coverage;
}

function generateImage(coverage,metric) {
  var color = '';
  colorSettings.forEach(function(setting){
    if(coverage >= setting.min) {
      color = setting.color;
    }
  });

  return '<?xml version="1.0" encoding="UTF-8"?>\
  <svg xmlns="http://www.w3.org/2000/svg" width="106" height="20">\
     <linearGradient id="b" x2="0" y2="100%">\
        <stop offset="0" stop-color="#bbb" stop-opacity=".1" />\
        <stop offset="1" stop-opacity=".1" />\
     </linearGradient>\
     <mask id="a">\
        <rect width="106" height="20" rx="3" fill="#fff" />\
     </mask>\
     <g mask="url(#a)">\
        <path fill="#555" d="M0 0h63v20H0z" />\
        <path fill="'+color+'" d="M63 0h43v20H63z" />\
        <path fill="url(#b)" d="M0 0h106v20H0z" />\
     </g>\
     <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">\
        <text x="31.5" y="15" fill="#010101" fill-opacity=".3">coverage</text>\
        <text x="31.5" y="14">coverage</text>\
        <text x="83.5" y="15" fill="#010101" fill-opacity=".3">'+coverage+'%</text>\
        <text x="83.5" y="14">'+coverage+'%</text>\
     </g>\
  </svg>';
}

http.createServer(function(req,res){
  var request = url.parse(req.url, true);
  if(!request.query.server || !request.query.resource || !request.query.metrics) {
    return;
  }

  var coverageHandler = function(coverage) {
      var image = generateImage(coverage, request.query.metrics);
      res.writeHead(200, {'Content-Type':'image/svg+xml;charset=utf-8'});
      res.end(image);
  }

  var onError = function(e) {
    console.log(e);
    res.writeHead(500, {'Content-Type':'text/plain'});
    res.end(e.toString());
  }

  var coverage = getCoverage(request.query.server,
    request.query.ssl,
    request.query.resource,
    request.query.metrics,
    coverageHandler,
    onError);

}).listen(port);
