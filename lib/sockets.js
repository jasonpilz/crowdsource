// const io = require('../index').io;

// io.on('connection', (socket) => {
//   console.log(`Users connected: ${io.engine.clientsCount}`);
//   io.emit('usersConnected', io.engine.clientsCount);

//   socket.on('message', (channel, message) => {
//     let poll = app.locals.polls[message.id];
//     switch (channel) {
//       case 'userConnected':
//         io.emit('updateVotes', poll.countVotes());
//         if (!poll.isActive) { socket.emit('disablePoll'); }
//         break;
//       case 'voteCast':
//         poll.votes.push(message.choice);
//         io.emit('updateVotes', poll.countVotes());
//         break;
//       case 'endPoll':
//         poll.isActive = false;
//         io.emit('disablePoll');
//         break;
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log(`Users connected: ${io.engine.clientsCount}`);
//     io.emit('usersConnected', io.engine.clientsCount);
//   })
// });
