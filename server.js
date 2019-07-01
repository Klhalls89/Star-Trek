const express = require('express');
//this defines express and requires it
const app = express(); 
//defining app as an implementaion of exprss
const enviroment = process.env.NODE_ENV || 'development';
//tells the server what enviroments to run on
const configuration = require('./knexfile')[enviroment];
//defines configureation and requires our knexfile
const database = require('knex')(configuration);
//this defines that our db is coming from our knex configuration
app.set('port', process.env.PORT || 3000);
//seting our port to either the process.env.PORT or 3000 depending on our environment

app.listen(app.get('port'), () => {
  //telling the app to run on port 300
 console.log(`App is running on 3000`)
});

app.get('/', (request, response) => {
  //assigning / to be a respons or the sting engage
  response.status(200).json('Engage')
})

app.get('/favicon.ico', (request, response) => {
  //Brennan told me I needed this for some reason
  response.status(200).json('Favicon?')
})

app.get('/api/v1/startrek', (request, response) => {
  //our get endpoint for all star trek characters
  database('startrek').select()
  //using the select method on our star trek db
    .then((startrek) => {
      //using then to interact with the promise
      response.status(200).json(startrek);
      //if successful 200 response showing the S.T. character
    })
    .catch((error) => {
      //catch set up for errors
      response.status(500).json({ error });
      //if unsuccessful show them 500 and the error
    });
});

app.get('/api/v1/startrek/:id', (request, response) => {
  //our get endpoint for specific chracters
  const id = parseInt(request.params.id, 10);
  //defining the id as the parsed integer we get from our request params
  //mdn says we need the 10 because we need 'An integer between 2 and 36 that represents the radix'
  database('startrek').where('id', id).select()
  //usging the where method and select method to grab the matching id
    .then((startrek) =>{
      if (startrek.length > 0) {
        //if the S.T. has length
        response.status(200).json(startrek);
        //200 for okay and showing the charecter to them
      } else {
        response.status(404).json({ error: 'there are no characters with that id' });
        //showing 404 for not found if no match is found
      }
    })
    .catch(error => response.status(500).json({ error }));
    //catching the error and sending 500 to them about ther server error
});

app.get('/api/v1/actors', (request, response) => {
  //get endpoint for our main actors page this takes in the request and response
  database('actors').select()
  //select method on the actors database
    .then((actors) => {
      //then after the promise comes back...
      response.status(200).json(actors);
      //200 for okay
    })
    .catch((error) => {
      //if it comes back wrong catching it...
      response.status(500).json({ error });
      //500 server error
    })
})

app.get('/api/v1/actors/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  database('actors').where('id', id).select()
    .then((actors) =>{
      if (actors.length > 0) {
        response.status(200).json(actors);
      } else {
        response.status(404).json({ error: 'there are no actor with that id' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

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

app.post('/api/v1/actors', (request, response) => {
  let actors= request.body;
  for (let requiredParameter of ['name', 'character', 'show', 'nationality']) {
    if (!actors[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `expected format: {name: <String>, character: <String>, 
                                          show: <String>, nationality: <String>} 
                                          you're missing a required property.`})
    }
  }
  database('actors').insert(actors, 'id')
    .then(actors => {
      response.status(201).json({ id: actors[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/startrek/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  database('startrek').where('id', id).select()
    .then((startrek) =>{
      if (startrek.length > 0) {
        response.status(202).json('deleted Star Trek character :.(');
      } else {
        response.status(404).json({ error: 'there are no startrek character with that id' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/actors/:id', (request, response) => {
  const id = parseInt(request.params.id, 10);
  database('actors').where('id', id).select()
    .then((actors) =>{
      if (actors.length > 0) {
        response.status(202).json('deleted actor');
      } else {
        response.status(404).json({ error: 'there are no actor with that id' });
      }
    })
    .catch(error => response.status(500).json({ error }));
});
