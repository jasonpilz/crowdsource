'use strict';

const io = require('../index').io;

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
  }

  countVotes() {
    let vC = {};
    this.votes.forEach(vote => vC[vote] ? vC[vote]++ : vC[vote] = 1);
    return vC;
  }

  winner() {
    let votes = this.countVotes();
    let draw  = this.checkIfDraw(votes);
    if (draw) {
      return 'There was a tie!'
    } else {
      let winner = Object.keys(votes).reduce((prev, curr) => {
                     return votes[prev] > votes[curr] ? prev : curr
                   });
      return winner;
    }
  }

  checkIfDraw(votes) {
    let values = []
    Object.keys(votes).forEach(key => values.push(votes[key]));
    let firstMax = values.reduce((prev, curr) => {
      return prev > curr ? prev : curr
    });
    let firstMaxIndex = values.indexOf(firstMax)

    if (firstMaxIndex > -1) { values.splice(firstMaxIndex, 1); }

    let secondMax = values.reduce((prev, curr) => {
      return prev > curr ? prev : curr
    });

    return firstMax === secondMax ? true : false
  }
}

module.exports = Poll;
