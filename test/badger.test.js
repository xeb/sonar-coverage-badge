var chai = require('chai'),
  assert = chai.assert,
  badger = require('../src/lib/badger.js');

var assertBadgeColor = function(coverage, expectedcolor) {
  var img = badger.GenerateImage(coverage);
  var ex = '<?xml version="1.0" encoding="UTF-8"?>  <svg xmlns="http://www.w3.org/2000/svg" width="106" height="20">     <linearGradient id="b" x2="0" y2="100%">        <stop offset="0" stop-color="#bbb" stop-opacity=".1" />        <stop offset="1" stop-opacity=".1" />     </linearGradient>     <mask id="a">        <rect width="106" height="20" rx="3" fill="#fff" />     </mask>     <g mask="url(#a)">        <path fill="#555" d="M0 0h63v20H0z" />        <path fill="' + expectedcolor + '" d="M63 0h43v20H63z" />        <path fill="url(#b)" d="M0 0h106v20H0z" />     </g>     <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">        <text x="31.5" y="15" fill="#010101" fill-opacity=".3">coverage</text>        <text x="31.5" y="14">coverage</text>        <text x="83.5" y="15" fill="#010101" fill-opacity=".3">' + coverage + '%</text>        <text x="83.5" y="14">' + coverage + '%</text>     </g>  </svg>';
  img.should.equal(ex);
};

describe('Badger', function() {
  it('should generate a success badge', function() {
    assertBadgeColor(99, '#4c1');
  });

  it('should default to gray when negative value', function() {
    assertBadgeColor(-10, '#ddd');
  });

  it('should get code coverage value', function(done) {

    badger.GetCoverage('nemo.sonarqube.org', undefined, 'org.codehaus.sonar-plugins.php:parent', 'coverage',
      function(d) { // success
        d.should.equal(95.4);
        done();
      },
      function() { // error
        assert.fail("Error occurred");
        done();
      });
  });

  it('should return parsed error', function(done) {
    badger.GetCoverage('fdasfdsfasdfdsfasdfsd', undefined, 'fdsfdasafd', 'afdasfsd', undefined,
      function(e) { // error
        assert.include(e.toString(), 'ENOTFOUND');
        done();
      });
  });

  it('should handle an error', function(done) {

    badger.GetCoverage('127.0.0.1', undefined, 'none', 'none', undefined,
      function(e) { // error
        assert.include(e.toString(), 'ECONNREFUSED');
        done();
      });
  });

});
