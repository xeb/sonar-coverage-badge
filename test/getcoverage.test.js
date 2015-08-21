var should = require('should'),
  assert = require('assert'),
  badger = require('../src/lib/badger.js');

describe('Get Coverage', function() {
  it('should get code coverage value', function(done) {

    var c = badger.GetCoverage('nemo.sonarqube.org', undefined, 'org.codehaus.sonar-plugins.php:parent', 'coverage',
    function(d){ // success
      d.should.equal(95.4);
      done();
    }, function(e){ // error
      assert.equal(undefined, e, "Error found " + e);
      done();
    });
  });

  // it('should send parse error out', function(done) {
  //
  //     var c = badger.GetCoverage('nemo.fasdfdsfasdfsd', undefined, 'org.codehaus.sonar-plugins.php:parent', 'coverage',
  //     function(d){ // success
  //       d.should.equal(95.4);
  //       done();
  //     }, function(e){ // error
  //       var v = (e.toString().indexOf("Error: connect ECONNREFUSED") > 1);
  //       assert.true(v)
  //       done();
  //     });
  //   });
  //
  //
  //   it('should handle an error', function(done) {
  //
  //       var c = badger.GetCoverage('127.0.0.1', undefined, 'none', 'none',
  //       function(d){ // success
  //         d.should.equal(95.4);
  //         done();
  //       }, function(e){ // error
  //         var v = (e.toString().indexOf("Error: connect ECONNREFUSED") > 1);
  //         assert.true(v)
  //         done();
  //       });
  //     });

});
