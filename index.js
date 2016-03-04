'use strict';

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const Poll       = require('./lib/poll');
const generateId = require('./lib/generate-id');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

app.locals.title = 'Crowdsource';
app.locals.polls = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

app.get('/', (request, response) => {
  response.render('index')
});

app.post('/polls', (request, response) => {
  let id = generateId(10);
  let adminId = generateId(4);
  let voteUrl = `${request.protocol}://${request.get('host')}/polls/${id}`
  let adminUrl = `${request.protocol}://${request.get('host')}/polls/${adminId}/${id}`

  let poll = new Poll(id, adminId, request.body.poll, voteUrl, adminUrl);

  app.locals.polls[id] = poll;

  response.redirect(adminUrl);
});

app.get('/polls/:adminId/:id', (request, response) => {
  let poll = app.locals.polls[request.params.id]

  if (poll.adminId != request.params.adminId) {
    return response.sendStatus(400);
  }
  response.render('adminPoll', { poll: poll });
})

app.get('/polls/:id', (request, response) => {
  let poll = app.locals.polls[request.params.id]

  response.render('poll', { poll: poll });
})

// get() set() update()

module.exports = app;

