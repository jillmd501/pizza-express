const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

const generateId = require('./lib/generate-id');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pizza Express';
app.locals.pizzas = {};

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/pizzas/:id', (request, response) => {
  var pizza = app.locals.pizzas[request.params.id];

  response.render('pizza', { pizza: pizza });
});

app.post('/pizzas', (request, response) => {
  var id = generateId();

  app.locals.pizzas[id] = request.body;

  response.sendStatus(201);
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
