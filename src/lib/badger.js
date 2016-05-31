var http = require('http'),
  https = require('https');

function badger() {
  this.GetCoverage = getCoverage;
  this.GenerateImage = generateImage;
}

module.exports = new badger();

var colorSettings = [{
  min: 0,
  color: '#a00'
}, {
  min: 50,
  color: '#7ECFE6'
}, {
  min: 90,
  color: '#4c1'
}];

function getCoverage(host, ssl, resource, metric, token, success, error) {
  var httplib = ssl ? https : http;

  var options = {
    hostname: host,
    path: '/api/resources?resource=' + resource + '&metrics=' + metric
  };

  if (token) {
    options.auth = token + ':';
  }

  httplib.get(options, function(res) {
    var str = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      str += chunk;
    });

    res.on('end', function() {
      try {
        var obj = JSON.parse(str);
        var mval = obj[0].msr[0].val;
        success(mval);
      } catch (e) {
        error(e);
      }
    });
  }).on('error', function(e) {
    error(e);
  });
}

function generateImage(coverage) {
  var color = "#ddd";
  colorSettings.forEach(function(setting) {
    if (coverage >= setting.min) {
      color = setting.color;
    }

  });

  /*jshint multistr: true */
  return '<?xml version="1.0" encoding="UTF-8"?>' +
    '  <svg xmlns="http://www.w3.org/2000/svg" width="106" height="20">' +
    '     <linearGradient id="b" x2="0" y2="100%">' +
    '        <stop offset="0" stop-color="#bbb" stop-opacity=".1" />' +
    '        <stop offset="1" stop-opacity=".1" />' +
    '     </linearGradient>' +
    '     <mask id="a">' +
    '        <rect width="106" height="20" rx="3" fill="#fff" />' +
    '     </mask>' +
    '     <g mask="url(#a)">' +
    '        <path fill="#555" d="M0 0h63v20H0z" />' +
    '        <path fill="' + color + '" d="M63 0h43v20H63z" />' +
    '        <path fill="url(#b)" d="M0 0h106v20H0z" />' +
    '     </g>' +
    '     <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">' +
    '        <text x="31.5" y="15" fill="#010101" fill-opacity=".3">coverage</text>' +
    '        <text x="31.5" y="14">coverage</text>' +
    '        <text x="83.5" y="15" fill="#010101" fill-opacity=".3">' + coverage + '%</text>' +
    '        <text x="83.5" y="14">' + coverage + '%</text>' +
    '     </g>' +
    '  </svg>';
}
