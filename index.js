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
  let id = generateId();
  let adminId = generateId();

  app.locals.polls[id] = new Poll(id, adminId, request.body.poll);

  response.redirect('/polls/' + id);
});

app.get('/polls/:id', (request, response) => {
  let poll = app.locals.polls[request.params.id]

  response.render('poll', { poll: poll });
})


// app.get('/polls/admin/:id')
// get() set() update()

module.exports = app;

