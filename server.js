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
  //get method for actors by id
  const id = parseInt(request.params.id, 10);
  // defining id and parsing the integer off the request params
  database('actors').where('id', id).select()
  //grabbing the actors db and using where and select to grab the matching id
    .then((actors) =>{
      //usgin then on the promise that comes back with an actor
      if (actors.length > 0) {
        //if actors has length
        response.status(200).json(actor);
        //response 200 for okay
      } else {
        //other wise
        response.status(404).json({ error: 'there are no actor with that id' });
        //404 for not foun and sending an error message
      }
    })
    .catch(error => response.status(500).json({ error }));
    //catching the error
});

app.post('/api/v1/startrek', (request, response) => {
  //posting end point for startrek db
  let startrek = request.body;
  //defining startrek ad the request body
  for (let requiredParameter of ['name', 'actor', 'ship', 'rank']) {
    //definging requiredParameters 
    if (!startrek[requiredParameter]) {
      //if their startrek entry does not have the req.prams...
      return response
        .status(422)
        //return 422 for unprocessable entry 
        .send({ error: `expected format: {name: <String>, actor: <String>, 
                                          ship: <String>, rank: <String>} 
                                          you're missing a required property.`})
        //shows them the proper format for an entry
    }
  }
  database('startrek').insert(startrek, 'id')
  // if entry is processable using the insert method to add it
    .then(startrek => {
      //then sending back 201 for newly created and giving it an id to send them
      response.status(201).json({ id: startrek[0] })
    })
    .catch(error => {
      //catching a server error or unprocessable entry
      response.status(500).json({ error });
      //500 server error
    });
});

app.post('/api/v1/actors', (request, response) => {
  //post for actors db
  let actors= request.body;
  //defining actors as the request body
  for (let requiredParameter of ['name', 'character', 'show', 'nationality']) {
    //defining requiredParameters for actors
    if (!actors[requiredParameter]) {
      //id the RP arn't there sending back
      return response
        .status(422)
        //422 for unprocessable entry
        .send({ error: `expected format: {name: <String>, character: <String>, 
                                          show: <String>, nationality: <String>} 
                                          you're missing a required property.`})
        //sending the proper format
    }
  }
  database('actors').insert(actors, 'id')
  //if it is processable inserting the actor to the db
    .then(actor => {
      //using .then to interact with the promise
      response.status(201).json({ id: actor[0] })
      //sending a response of 201 for newly created
    })
    .catch(error => {
      //catinging and error
      response.status(500).json({ error });
      //500 for server error
    });
});

app.delete('/api/v1/startrek/:id', (request, response) => {
  //delet endpoint for a star trek character with an id
  const id = parseInt(request.params.id, 10);
  //defining id as the parsed integer from the request params
  database('startrek').where('id', id).select()
  //using where and select to delete the matching charcter
    .then((startrek) =>{
      if (id == actor.id) {
        //if id matches
        response.status(202).json('deleted Star Trek character :.(');
        //202 for deleted content along with a message
      } else {
        //other wise...
        response.status(404).json({ error: 'there are no startrek character with that id' });
        // a 404 not found and a message
      }
    })
    .catch(error => response.status(500).json({ error }));
    //catch the server error and send back 500
});

app.delete('/api/v1/actors/:id', (request, response) => {
  //delete endpoint for actors with and id
  const id = parseInt(request.params.id, 10);
  //defining the id as the parsed integer from the request paramater
  database('actors').where('id', id).select()
    //using where and select to delete the matching actor
    .then((actor) =>{
      if (id == actor.id) {
        response.status(202).json('deleted actor');
        //202 for deleted content along with a message
      } else {
        //other wise...
        response.status(404).json({ error: 'there are no actor with that id' });
       // a 404 not found and a message
      }
    })
    .catch(error => response.status(500).json({ error }));
    //catch the server error and send back 500
});
