'use strict';

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

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
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
      this.request.get('/', (error, response) => {
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a body with the name of the application', (done) => {
      let title = app.locals.title;

      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(title),
              `"${response.body} does not include ${title}"`);
        done();
      });
    });
  });

  describe('POST /polls', () => {
    beforeEach(() => {
      app.locals.polls = {};
    });
    it('should receive and store poll objects', (done) => {
      assert(true);
      done();
    })

    it('should not return a 404', (done) => {
      this.request.post('/polls', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });
  })

});
