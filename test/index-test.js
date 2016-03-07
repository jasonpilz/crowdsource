'use strict';

const assert    = require('assert');
const expect    = require('chai').expect;
const request   = require('request');
const supertest = require('supertest');
const app       = require('../index').app;
const fixtures  = require('./fixtures');
const Poll      = require('../lib/poll');

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
      let payload = {
        poll: {
          title: 'this is a poll',
          openTime: '',
          userNumber: '',
          responses: [ 'hey', 'you'  ]
        }
      }

      this.request.post('/polls', { form: payload }, (error, response) => {
        if (error) { done(error); }
      });

      app.locals.polls.testPoll = fixtures.validPoll;

      let pollCount = Object.keys(app.locals.polls).length;

      assert.equal(pollCount, 1, `Expected 1 poll, found ${pollCount}`);
      done();
    });

    it('should not return a 404', (done) => {
      this.request.post('/polls', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });
  });

  describe('GET /polls/:id', () => {
    beforeEach(() => {
      app.locals.polls.testPoll = fixtures.validPoll;
    })

    it('should not return a 404', (done) => {
      this.request.get('/polls/testPoll', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      })
    })

    it('should return a page with the title of the poll', (done) => {
      let poll = app.locals.polls.testPoll;

      this.request.get('/polls/testPoll', (error, response) => {
        if (error) { done(error); }
          assert(response.body.includes(poll.title),
                `${response.body} does not include ${poll.title}`);
          done();
      });
    });

    it('should return a page with the poll choices', (done) => {
      let poll = app.locals.polls.testPoll;

      this.request.get('/polls/testPoll', (error, response) => {
        if (error) { done(error); }

        poll.choices.forEach((choice) => {
          assert(response.body.includes(choice));
        });
        done();
      });
    });
  });

});
