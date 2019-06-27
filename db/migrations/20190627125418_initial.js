
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('startrek', function(table){
      table.increments('id').primary();
      table.string('name');
      table.string('actor');
      table.array('ship');
      table.string('rank');
    })
  ])
};

exports.down = function(knex) {
  
};
