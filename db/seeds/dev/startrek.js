const trekData = require('../../../data/trek_data');
const actorData = require('../../../data/actor_data')

exports.seed = function(knex) {
  return knex('actors').del() 
    .then(() => knex('startrek').del())
    .then(() => {
      return Promise.all(
        trekData.map(character => {
          return knex('startrek').insert(character, 'id')
          .then(id => {
            const match = actorData.find(actor => {
             return actor.name === character.actor
            })
            return knex('actors').insert({...match, startrek_id: id[0]})
          })  
        })
        // .then(startrek => {
        //   return knex('actors').insert([
        //     { name: 'William Shatner', character: 'James Kirk', show: ['TOS'], nationality: 'American'}
        //   ])
        // })
        // .then(() => console.log('Seeding complete!'))
        // .catch(error => console.log(`Error seeding data: ${error}`))
      )
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
