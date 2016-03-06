module.exports = {
  setVoteUrl: (request, id, adminId) => {
    return `${request.protocol}://${request.get('host')}/polls/${id}`;
  },
  setAdminUrl: (request, id, adminId) => {
    return `${request.protocol}://${request.get('host')}/polls/${id}/${adminId}`;
  }
};
