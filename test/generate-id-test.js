'use strict';

const crypto = require('../lib/generate-id');
const assert = require('assert');

describe('Generating a encrypted ID', () => {

  it('returns a random scrambled string', () => {
    let randomString = crypto(5);

    assert(randomString);
    assert.equal('string', typeof(randomString));
  });

  it('returns a arbitrary length random string', () => {
    let randomStringOfTenChars   = crypto(5);
    let randomStringOfFourChars = crypto(2);

    assert.equal(10, randomStringOfTenChars.length);
    assert.equal(4, randomStringOfFourChars.length);
  });
});
