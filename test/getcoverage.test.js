var chai = require('chai'),
  expect = chai.expect,
  assert = chai.assert,
  should = chai.should(),
  badger = require('../src/lib/badger.js');

describe('Get Coverage', function() {
  it('should get code coverage value', function(done) {

    var c = badger.GetCoverage('nemo.sonarqube.org', undefined, 'org.codehaus.sonar-plugins.php:parent', 'coverage',
    function(d){ // success
      d.should.equal(95.4);
      done();
    }, function(e){ // error
      assert.fail("Error occurred");
      done();
    });
  });

  it('should return parsed error', function(done) {
      var c = badger.GetCoverage('fdasfdsfasdfdsfasdfsd', undefined, 'fdsfdasafd', 'afdasfsd', undefined,
      function(e){ // error
        assert.include(e.toString(), 'ENOTFOUND');
        done();
      });
   });


    it('should handle an error', function(done) {

        var c = badger.GetCoverage('127.0.0.1', undefined, 'none', 'none', undefined,
        function(e){ // error
          assert.include(e.toString(), 'ECONNREFUSED');
          done();
        });
      });

});
