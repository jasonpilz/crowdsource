const assert  = require('assert');
const request = require('request');
const app     = require('../index');

describe('Index', () => {

  before((done) => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {

    it('should return a 200', (done) => {
      request.get('http://localhost:9876', (error, response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });

  });

});
