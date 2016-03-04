function Poll (id, adminId, pollData, voteUrl, adminUrl, isActive) {
  this.id = id;
  this.adminId = adminId;
  this.title = pollData.title;
  this.choices = pollData.responses || [];
  this.isActive = isActive || true;
  this.voteUrl = voteUrl;
  this.adminUrl = adminUrl;
};

Poll.prototype.countVotes = function (votes) {

}

module.exports = Poll;
