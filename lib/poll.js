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



  // countVotes() {
  //   let voteCount = {};
  //   this.votes.forEach((vote) => {
  //     if (voteCount[vote]) {
  //       voteCount[vote]++;
  //     } else {
  //       voteCount[vote] = 1;
  //     }
  //   });
  //   return voteCount;
  // }

}

module.exports = Poll;
