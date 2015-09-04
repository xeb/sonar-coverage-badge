var chai = require('chai'),
  expect = chai.expect,
  assert = chai.assert,
  should = chai.should(),
  index = require('../src/index.js');


  // utility function for test
  var isPortTaken = function(port, fn) {
    var net = require('net')
    var tester = net.createServer()
    .once('error', function (err) {
      if (err.code != 'EADDRINUSE') return fn(err)
      fn(null, true)
    })
    .once('listening', function() {
      tester.once('close', function() { fn(null, false) })
      .close()
    })
    .listen(port)
  }


  describe('Index ', function() {
    it('should default port to 8087', function(done) {
        var port = index.GetPort();
        port.should.equal(8087);
        done();
    });

    it('should start a server on specific port', function(done) {
        var port = 9999;

        isPortTaken(port, function(err, state){
          assert.false(state);
          done();
        });

        index.StartServer(port);

        isPortTaken(port, function(err, state){
          assert.true(state);
          done();
        });

        done();
    });
  });
