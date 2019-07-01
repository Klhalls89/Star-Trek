# Star Trek Build your own back-end

It's Express with Knex!

## Technologies used
* Express
* Knex
* Node.js
* SQL

I built my own data set from the theme of 1990s Star Trek characters and actors then seeded a database with it using knex.

## End points

### GET

The GET endpoint allows you to read all actors or all Star Trek characters

### POST

The Post allows you to add in an actor or a Star Trek character

To add a Star Trek character you must structure it like so 
{
  "name": "character name",
  "actor": "Actor name",
  "ship": "Ship name",
  "rank": "Rank name"
}
To add an actor from Star Trek you must structure it like so 
{
  "name": "Actor name",
  "character": "Character name",
  "show": "Show name",
  "nationality": "Nation name"
}

### DELETE

To delete an actor or a Star Trek character you must have their ID


