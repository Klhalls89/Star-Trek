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
  response.status(200).json('Favicon?')
})

app.get('/api/v1/startrek', (request, response) => {
  database('startrek').select()
    .then((startrek) => {
      response.status(200).json(startrek);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/startrek/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  database('startrek').where('id', id).select()
    .then((startrek) =>{
      if (startrek.length > 0) {
        response.status(200).json(startrek);
      } else {
        response.status(404).json({ error: 'there are no characters with that id' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/actors', (request, response) => {
  database('actors').select()
    .then((actors) => {
      response.status(200).json(actors);
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
})


app.post('/api/v1/startrek', (request, response) => {
  let startrek = request.body;

  for (let requiredParameter of ['name', 'actor', 'ship', 'rank']) {
    if (!startrek[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `expected format: {name: <String>, actor: <String>, 
                                          ship: <String>, rank: <String>} 
                                          you're missing a required property.`})
    }
  }

  database('startrek').insert(startrek, 'id')
    .then(startrek => {
      response.status(201).json({ id: startrek[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});


