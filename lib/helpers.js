module.exports = {
  setPollExpiry: (poll) => {
    console.log(`Poll expires in: ${poll.expiry} minutes.`)
    if (poll.expiry) {
      setTimeout(function () {
        closePoll(poll);
      }, poll.expiry * 60000);
    }
  },
  setVoteUrl: (request, id, adminId) => {
    return `${request.protocol}://${request.get('host')}/polls/${id}`;
  },
  setAdminUrl: (request, id, adminId) => {
    return `${request.protocol}://${request.get('host')}/polls/${id}/${adminId}`;
  }
}
