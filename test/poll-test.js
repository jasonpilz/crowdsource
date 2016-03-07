'use strict';

const Poll    = require('../lib/poll');
const assert  = require('assert');
const crypto  = require('../lib/generate-id');
const helper  = require('../lib/helpers');
const request = {
  protocol: 'http',
  get: (host) => { return 'localhost'; }
};

const pollData = {
  responses: ['hey', 'there'],
  title: 'The best poll',
  openTime: 3,
  userNumber: 13334448888
};

let id       = crypto(10);
let adminId  = crypto(4);
let voteUrl  = helper.setVoteUrl(request, id, adminId);
let adminUrl = helper.setAdminUrl(request, id, adminId);
let poll     = new Poll(id, adminId, pollData, voteUrl, adminUrl);

describe('Poll', () => {
  context('with default attributes', () => {

    let poll = new Poll('234', '45', {}, 'url', 'aurl');

    it('should assign empty array of choices', () => {
      assert.equal(0, poll.choices.length);
    });

    it('should assign active status', () => {
      assert.equal(true, poll.isActive);
    });
  });

  context('can create a new poll object with the desired attributes', () => {
    assert(poll);
    assert.equal(20, poll.id.length);
    assert.equal(8, poll.adminId.length);
    assert.equal('The best poll', poll.title);
    assert.equal(2, poll.choices.length);
    assert.equal(3, poll.expiry);
    assert(poll.voteUrl);
    assert(poll.adminUrl);
    assert(poll.twilio);
  });

  context('can perform its prototype functions', () => {

    it('can return a hash of choices and vote counts', () => {
      poll.votes.push('hey');
      poll.votes.push('there');

      let voteCounts = poll.countVotes();
      let expectedResults = { 'hey': 1, 'there': 1 };

      assert.equal(1, voteCounts.hey);
      assert.equal(1, voteCounts.there);
    });

    it('can return how many different options were voted on', () => {
      let differentOptionsVotedOn = poll.countResults();

      assert.equal(2, differentOptionsVotedOn);
    });

    it('can return message of a tie', () => {
      let tieMessage = poll.result();

      assert.equal('There was a tie!', tieMessage);
    });

    it('can return a message of no votes cast', () => {
      poll.votes = [];

      let noVotesMessage = poll.result();
      assert.equal('No votes were cast!', noVotesMessage);
    });

    it('can return the name of highest vote', () => {
      poll.votes.push('hey');
      poll.votes.push('hey');
      poll.votes.push('there');

      let winningVote = poll.result();
      assert.equal('hey', winningVote);
    });

  });
});
