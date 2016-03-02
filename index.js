const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

app.locals.title = 'Crowdsource';

app.use(express.static('static'));

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

app.get('/', (request, response) => {
  response.send(app.locals.title);
});

app.get('/', (request, response) => {
  response.render('index')
});

// app.get('/polls/:id')
// app.get('/polls/admin/:id')
// app.post('/polls')

// make sure to have 2 different :id for admin/regular views.
// get() set() update()

module.exports = app;

