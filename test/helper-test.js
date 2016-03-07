'use strict';

const assert = require('assert');
const helper = require('../lib/helpers');

describe('The legendary helpers', () => {

  const request = {
    protocol: 'http',
    get: (host) => { return 'localhost'; }
  };

  it('exists', () => {
    assert(helper);
  });

  it('can return a voting URL', () => {
    let voteUrl = helper.setVoteUrl(request, 'asdhq4', '7979798');

    assert(voteUrl);
    assert.equal('http://localhost/polls/asdhq4', voteUrl);
  });

  it('can return a admin URL', () => {
    let adminUrl = helper.setAdminUrl(request, 'adsih', '23234');

    assert(adminUrl);
    assert.equal('http://localhost/polls/adsih/23234', adminUrl);
  });

});
