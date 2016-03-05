'use strict';

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const Poll       = require('./lib/poll');
const generateId = require('./lib/generate-id');
const http       = require('http');
const port       = process.env.PORT || 3000;
const server     = http.createServer(app)
                       .listen(port, () => {
                         console.log(`Listening on port ${port}`);
                       });
const socketIo   = require('socket.io');
const io         = socketIo(server);

app.set('port', port);
app.set('view engine', 'jade');

app.locals.title = 'Crowdsource';
app.locals.polls = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//============================== Socket.io ================================

io.on('connection', (socket) => {
  console.log(`Users connected: ${io.engine.clientsCount}`);
  io.emit('usersConnected', io.engine.clientsCount);

  socket.on('message', (channel, message) => {
    let poll = app.locals.polls[message.id];
    switch (channel) {
      case 'voteCast':
        poll.votes.push(message.choice);
        io.emit('voteCount', poll.countVotes());
        break;
      case 'endPoll':
        poll.isActive = false;
        io.emit('disablePoll');
        break;
    }
  });

  socket.on('disconnect', () => {
    console.log(`Users connected: ${io.engine.clientsCount}`);
    io.emit('usersConnected', io.engine.clientsCount);
  })
});

//================================= Routes ================================

app.get('/', (request, response) => {
  response.render('index')
});

app.post('/polls', (request, response) => {
  if (!request.body.poll) { return response.sendStatus(400); }
  let id       = generateId(10);
  let adminId  = generateId(4);
  let voteUrl  = `${request.protocol}://${request.get('host')}/polls/${id}`
  let adminUrl = `${request.protocol}://${request.get('host')}/polls/${id}/${adminId}`
  let poll     = new Poll(id, adminId, request.body.poll, voteUrl, adminUrl);

  app.locals.polls[id] = poll;

  response.redirect(adminUrl);
});

app.get('/polls/:id', (request, response) => {
  let poll = app.locals.polls[request.params.id];
  if (!poll) { return response.sendStatus(400); }

  response.render('poll', { poll: poll });
})

app.get('/polls/:id/:adminId', (request, response) => {
  let poll = app.locals.polls[request.params.id]
  if (!poll) { return response.sendStatus(400); }

  if (poll.adminId != request.params.adminId) {
    return response.sendStatus(400);
  }
  response.render('adminPoll', { poll: poll });
})

module.exports = app;

