
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('startrek', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('actor');
      table.array('ship');
      table.string('rank');

      table.timestamps(true, true)
    }),

    knex.schema.createTable('actors', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('character');
      table.array('show');
      table.string('nationality');
      table.integer('startrek_id').unsigned()
      table.foreign('startrek_id')
        .references('startrek.data')

      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('startrek'),
    knex.schema.dropTable('actors')
  ]);
};
