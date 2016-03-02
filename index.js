const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

app.locals.title = 'Crowdsource';

app.get('/', (request, response) => {
  response.send('Hello World!');
});

