exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.string("table_name").notNull();
    table.integer("capacity").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};
