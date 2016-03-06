'use strict';

const Twilio = require('./twilio');

class Poll {
  constructor (id, adminId, pollData, voteUrl, adminUrl, isActive) {
    this.id       = id;
    this.adminId  = adminId;
    this.title    = pollData.title;
    this.choices  = pollData.responses || [];
    this.votes    = [];
    this.isActive = isActive || true;
    this.expiry   = pollData.openTime;
    this.voteUrl  = voteUrl;
    this.adminUrl = adminUrl;
    this.twilio   = new Twilio(pollData.userNumber);
  }

  countVotes() {
    let vC = {};
    this.votes.forEach(vote => vC[vote] ? vC[vote]++ : vC[vote] = 1);
    return vC;
  }

  countResults() {
    return Object.keys(this.countVotes()).length;
  }

  maxValue(values) {
    return values.reduce((prev, curr) => { return prev > curr ? prev : curr; });
  }

  singleVote() {
    return Object.keys(this.countVotes()).shift();
  }

  result() {
    let numPollsCast = this.countResults();
    switch (numPollsCast) {
      case 0:
        return 'No votes were cast!';
      case 1:
        return this.singleVote();
      default:
        return this.winner();
    }
  }

  winner() {
    let votes = this.countVotes();
    if (this.checkIfDraw(votes)) { return 'There was a tie!'; }

    return Object.keys(votes).reduce((prev, curr) => {
      return votes[prev] > votes[curr] ? prev : curr;
    });
  }

  topTwoVotes(values) {
    let firstMax      = this.maxValue(values);
    let firstMaxIndex = values.indexOf(firstMax);
    if (firstMaxIndex > -1) { values.splice(firstMaxIndex, 1); }
    let secondMax     = this.maxValue(values);
    return [firstMax, secondMax];
  }

  checkIfDraw(votes) {
    let values = Object.keys(votes).map(key => votes[key]);
    let topTwo = this.topTwoVotes(values);
    return topTwo[0] === topTwo[1] ? true : false;
  }
}

module.exports = Poll;
