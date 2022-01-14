exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.string("table_name").notNull();
    table.integer("capacity").notNull();
    table.integer("reservation_id").unsigned();

    // link to reservation record
    // ONE TO ONE
    table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("cascade");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};
