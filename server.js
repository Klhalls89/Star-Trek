const express = require('express');
const app = express(); 
const enviroment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[enviroment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
 console.log(`App is running on 3000`)
});

app.get('/', (request, response) => {
  response.status(200).json('Engage')
})

app.get('/favicon.ico', (request, response) => {
  response.status(200).json('Engage')
})

