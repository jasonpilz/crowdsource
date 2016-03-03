function Poll (id, adminId, pollData, isActive) {
  this.id = id;
  this.adminId = adminId;
  this.title = pollData.title;
  this.choices = pollData.responses || [];
  this.isActive = isActive || true;
};

module.exports = Poll;
